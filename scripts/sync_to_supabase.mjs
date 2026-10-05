import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Đọc file .env hoặc .env.local nếu có
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  const env = {};
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (!env[key] && val) env[key] = val;
          }
        }
      });
    }
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️ Chưa tìm thấy thông tin cấu hình Supabase (URL / ANON KEY).');
  console.log('👉 Bạn có 2 cách thực hiện:');
  console.log('1. Cách 1: Điền VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env.local rồi chạy lại lệnh: node scripts/sync_to_supabase.mjs');
  console.log('2. Cách 2: Mở Supabase Dashboard -> SQL Editor, copy nội dung file supabase_seed_youtube_tests.sql và bấm RUN.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  console.log(`🚀 Đang kết nối Supabase: ${supabaseUrl}`);
  
  const defaultTestsMod = await import('../src/data/defaultTests.js');
  const listeningMod = await import('../src/data/listeningPracticeTests.js');
  const ctwMod = await import('../src/data/completeTheWordsData.js');

  const readingTests = [];
  for (let i = 2; i <= 15; i++) {
    const key = 'readingTest' + (i < 10 ? '0' + i : i);
    if (defaultTestsMod[key]) readingTests.push(defaultTestsMod[key]);
  }

  const listeningTests = listeningMod.ALL_LISTENING_PRACTICE_TESTS || [];
  const gabbleTests = (ctwMod.COMPLETE_THE_WORDS_BANK || []).filter(t => t.category === 'GabbleAI');

  const payload = [];

  // Reading tests
  readingTests.forEach(t => {
    payload.push({
      id: t.id,
      title: t.title,
      skill: 'reading',
      task_type: 'multistage',
      duration_seconds: t.duration_seconds || 1800,
      content: {
        stages: t.stages,
        description: t.description,
        youtube_url: t.youtube_url,
        source: t.source,
        created_at_ms: t.created_at_ms || Date.now()
      }
    });
  });

  // Listening tests
  listeningTests.forEach(t => {
    payload.push({
      id: t.id,
      title: t.title,
      skill: 'listening',
      task_type: 'multistage',
      duration_seconds: t.duration_seconds || 1740,
      content: {
        stages: t.stages,
        description: t.description,
        youtube_url: t.youtube_url,
        source: t.source,
        created_at_ms: t.created_at_ms || Date.now()
      }
    });
  });

  // GabbleAI tests
  gabbleTests.forEach(t => {
    const duration = 480;
    payload.push({
      id: t.id,
      title: t.title,
      skill: 'reading',
      task_type: 'complete_words',
      duration_seconds: duration,
      content: {
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
      }
    });
  });

  console.log(`📦 Chuẩn bị đẩy tổng cộng ${payload.length} đề thi lên Supabase...`);

  // Đẩy từng batch 10 đề để tránh giới hạn kích thước payload
  const BATCH_SIZE = 10;
  let successCount = 0;
  for (let i = 0; i < payload.length; i += BATCH_SIZE) {
    const chunk = payload.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase.from('tests').upsert(chunk, { onConflict: 'id' });
    if (error) {
      console.error(`❌ Lỗi batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
    } else {
      successCount += chunk.length;
      console.log(`✅ Đã đẩy thành công ${successCount}/${payload.length} đề thi.`);
    }
  }

  console.log(`🎉 Hoàn tất đồng bộ: Đã nạp thành công ${successCount} bộ đề vào bảng tests của Supabase!`);
}

sync().catch(err => {
  console.error('Lỗi khi đồng bộ:', err);
});
