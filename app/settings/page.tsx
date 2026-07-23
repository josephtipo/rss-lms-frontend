export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-lg text-slate-600">
          Configure application preferences and view the current dashboard
          configuration. Interactive settings will be implemented in
          Assessment 2.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          Dashboard Configuration
        </h2>

        <div className="space-y-5">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">Theme</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              Light Mode
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">Notifications</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">RSS Refresh Interval</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              Every 15 minutes
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium">Application Version</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              v1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Backend Status</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
              Assessment 2
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Planned Enhancements
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>Live RSS feed management</li>
          <li>User authentication</li>
          <li>Cloud database integration</li>
          <li>Custom dashboard preferences</li>
          <li>Dark mode support</li>
        </ul>
      </section>
    </div>
  );
}