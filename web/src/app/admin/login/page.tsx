import { loginAction } from "@/actions/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-maroon p-4">
      <form action={loginAction} className="w-full max-w-md space-y-4 rounded-2xl bg-parchment p-8 shadow-xl">
        <h1 className="text-center font-display text-3xl text-maroon">Admin login</h1>
        <p className="text-center text-sm text-ink/70">Yasin Dava Khana</p>
        {error ? <p className="rounded-lg bg-red-100 p-2 text-center text-red-800">Wrong email or password</p> : null}
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            required
            name="email"
            type="email"
            defaultValue="admin@yasindawakhana.com"
            className="mt-1 w-full rounded-lg border border-gold/50 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input required name="password" type="password" className="mt-1 w-full rounded-lg border border-gold/50 px-3 py-2" />
        </label>
        <button className="w-full rounded-lg bg-maroon py-2 text-white">Sign in</button>
      </form>
    </div>
  );
}
