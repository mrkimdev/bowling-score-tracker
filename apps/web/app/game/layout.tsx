
export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex items-center justify-center min-h-svh">
      {children}
    </main>
  )
}