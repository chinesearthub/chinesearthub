import { NextResponse } from 'next/server';
import { generateNameSuggestions } from '@/lib/fonts'; // 使用@别名指向lib目录

export async function POST(req: Request) {
  try {
    const { name, mode, desiredMeaning } = await req.json();
    // 调用实际生成逻辑
    const suggestions = await generateNameSuggestions({
      name,
      mode,
      desiredMeaning
    });
    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    );
  }
}
