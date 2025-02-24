import { Streak } from '@ota-coding/interfaces';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ case: string }> }
): Promise<Streak> {
  const caseParam = (await params).case  
  const streaks = await fetch(`${process.env.BACKEND_API}/streaks/${caseParam}`);

  return streaks as unknown as Streak;
}