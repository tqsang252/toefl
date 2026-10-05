import fs from 'fs';
import path from 'path';

async function generate() {
  const defaultTestsMod = await import('../src/data/defaultTests.js');
  const listeningMod = await import('../src/data/listeningPracticeTests.js');
  const ctwMod = await import('../src/data/completeTheWordsData.js');

  const readingTests = [];
  for (let i = 2; i <= 15; i++) {
    const key = 'readingTest' + (i < 10 ? '0' + i : i);
    if (defaultTestsMod[key]) {
      readingTests.push(defaultTestsMod[key]);
    }
  }

  const listeningTests = listeningMod.ALL_LISTENING_PRACTICE_TESTS || [];
  const gabbleTests = (ctwMod.COMPLETE_THE_WORDS_BANK || []).filter(t => t.category === 'GabbleAI');

  console.log('Reading tests to export:', readingTests.length);
  console.log('Listening tests to export:', listeningTests.length);
  console.log('GabbleAI Complete the Words tests to export:', gabbleTests.length);

  const escapeSql = (str) => {
    if (typeof str !== 'string') str = JSON.stringify(str);
    return str.replace(/'/g, "''");
  };

  const sqlStatements = [
    '-- ====================================================================',
    '-- TOEFL SMART 2026 - YOUTUBE IMPORTED TESTS SEED SCRIPT',
    '-- Nạp toàn bộ 14 đề Reading, 14 đề Listening và 12 đề Complete the Words từ YouTube',
    '-- Hướng dẫn: Mở Supabase Dashboard -> SQL Editor -> New Query -> Dán toàn bộ và bấm RUN',
    '-- ====================================================================',
    '',
    'BEGIN;',
    ''
  ];

  // 1. Reading Tests
  sqlStatements.push('-- ====================================================================');
  sqlStatements.push('-- 1. 14 BỘ ĐỀ READING 2026 TỪ YOUTUBE (MODULE 1 & MODULE 2 ĐẦY ĐỦ)');
  sqlStatements.push('-- ====================================================================');
  readingTests.forEach(t => {
    const contentJson = JSON.stringify({
      stages: t.stages,
      description: t.description,
      youtube_url: t.youtube_url,
      source: t.source,
      created_at_ms: t.created_at_ms || Date.now()
    });
    sqlStatements.push(`INSERT INTO public.tests (id, title, skill, task_type, duration_seconds, content, created_at)
VALUES (
  '${escapeSql(t.id)}',
  '${escapeSql(t.title)}',
  'reading',
  'multistage',
  ${t.duration_seconds || 1800},
  '${escapeSql(contentJson)}'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  skill = EXCLUDED.skill,
  task_type = EXCLUDED.task_type,
  duration_seconds = EXCLUDED.duration_seconds,
  content = EXCLUDED.content;
`);
  });

  // 2. Listening Tests
  sqlStatements.push('-- ====================================================================');
  sqlStatements.push('-- 2. 14 BỘ ĐỀ LISTENING 2026 TỪ YOUTUBE (MODULE 1 & MODULE 2 ĐẦY ĐỦ)');
  sqlStatements.push('-- ====================================================================');
  listeningTests.forEach(t => {
    const contentJson = JSON.stringify({
      stages: t.stages,
      description: t.description,
      youtube_url: t.youtube_url,
      source: t.source,
      created_at_ms: t.created_at_ms || Date.now()
    });
    sqlStatements.push(`INSERT INTO public.tests (id, title, skill, task_type, duration_seconds, content, created_at)
VALUES (
  '${escapeSql(t.id)}',
  '${escapeSql(t.title)}',
  'listening',
  'multistage',
  ${t.duration_seconds || 1740},
  '${escapeSql(contentJson)}'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  skill = EXCLUDED.skill,
  task_type = EXCLUDED.task_type,
  duration_seconds = EXCLUDED.duration_seconds,
  content = EXCLUDED.content;
`);
  });

  // 3. GabbleAI Complete the Words
  sqlStatements.push('-- ====================================================================');
  sqlStatements.push('-- 3. 12 BÀI COMPLETE THE WORDS TỪ GABBLEAI YOUTUBE');
  sqlStatements.push('-- ====================================================================');
  gabbleTests.forEach(t => {
    const duration = 480;
    const contentObj = {
      instructions: 'Complete the words by filling in the missing letters.',
      paragraph: t.passage,
      passage: t.passage,
      blanks: t.blanks,
      completed_passage: t.completed_passage,
      translations: t.translations,
      vocabulary_breakdown: t.vocabulary_breakdown,
      topic: t.topic,
      category: t.category,
      source: t.source,
      youtube_url: t.youtube_url,
      stages: [
        {
          id: `${t.id}_stage_1`,
          title: t.title,
          duration_seconds: duration,
          tasks: [
            {
              id: `${t.id}_task_1`,
              title: t.title,
              task_type: 'complete_words',
              content: {
                instructions: 'Complete the words by filling in the missing letters.',
                paragraph: t.passage,
                passage: t.passage,
                blanks: t.blanks,
                completed_passage: t.completed_passage
              }
            }
          ]
        }
      ]
    };
    const contentJson = JSON.stringify(contentObj);
    sqlStatements.push(`INSERT INTO public.tests (id, title, skill, task_type, duration_seconds, content, created_at)
VALUES (
  '${escapeSql(t.id)}',
  '${escapeSql(t.title)}',
  'reading',
  'complete_words',
  ${duration},
  '${escapeSql(contentJson)}'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  skill = EXCLUDED.skill,
  task_type = EXCLUDED.task_type,
  duration_seconds = EXCLUDED.duration_seconds,
  content = EXCLUDED.content;
`);
  });

  sqlStatements.push('COMMIT;');
  sqlStatements.push('');

  const outPath = 'supabase_seed_youtube_tests.sql';
  fs.writeFileSync(outPath, sqlStatements.join('\n'), 'utf8');
  console.log(`Đã xuất file thành công: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
}

generate().catch(console.error);
