import Link from 'next/link'
 
export default function Home() {
  return (
    <div className = "h-screen bg-slate-500">
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}