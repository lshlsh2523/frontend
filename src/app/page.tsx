import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Hello World</h1>
        <p className="mt-3 text-sm text-gray-600">
          커뮤니티 페이지로 바로 이동할 수 있습니다.
        </p>
        <Link
          href="/community"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          커뮤니티 바로가기
        </Link>
      </div>
    </main>
  );
}
