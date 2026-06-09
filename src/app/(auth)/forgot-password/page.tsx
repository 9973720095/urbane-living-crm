export default function ForgotPasswordPage() {
  return (
    <div className="p-8 max-w-sm mx-auto border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4">Reset Password</h2>
      <input type="email" placeholder="Enter your email" className="w-full border p-2 mb-4 rounded" />
      <button className="w-full bg-slate-900 text-white p-2 rounded">Send Reset Link</button>
    </div>
  );
}