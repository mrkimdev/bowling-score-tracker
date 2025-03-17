
export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-svh">
      <div className="mt-20 mx-auto max-w-[996px] px-4">
        {children}
      </div>
    </main>
  )
}