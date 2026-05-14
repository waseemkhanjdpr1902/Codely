import { FileCode2, Globe2, Monitor, Rocket, Save, Send, Workflow } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const categories = ['Website', 'SaaS App', 'Dashboard', 'Landing Page', 'API Tool'];
const files = ['app/page.tsx', 'app/layout.tsx', 'components/Hero.tsx', 'components/Pricing.tsx', 'README.md'];

export default function BuilderPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">Builder</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Describe your app idea</h1>
        <p className="mt-2 text-slate-600">This UI is ready for the next backend phase. Actions currently show placeholders.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_0.7fr_1fr]">
        <Card className="p-5">
          <label className="text-sm font-semibold text-slate-950" htmlFor="builder-prompt">
            App prompt
          </label>
          <textarea
            id="builder-prompt"
            className="mt-3 h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
            placeholder="Example: Build a subscription CRM for small agencies with dashboard, auth, pricing, and settings."
          />

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-slate-950">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="secondary"
                  actionMessage="Coming in next phase"
                  className="h-9 px-3"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Button actionMessage="Coming in next phase">
              <Send size={16} />
              Generate App
            </Button>
            <Button variant="secondary" actionMessage="Coming in next phase">
              <Save size={16} />
              Save Project
            </Button>
            <Button variant="secondary" actionMessage="Coming in next phase">
              <Workflow size={16} />
              Export to GitHub
            </Button>
            <Button variant="dark" actionMessage="Coming in next phase">
              <Rocket size={16} />
              Deploy to Vercel
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileCode2 className="text-blue-600" size={20} />
            <h2 className="font-semibold text-slate-950">Generated files</h2>
          </div>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                {file}
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Monitor className="text-blue-600" size={20} />
            <h2 className="font-semibold text-slate-950">Preview</h2>
          </div>
          <div className="bg-slate-100 p-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-3 w-24 rounded-lg bg-slate-900" />
                <div className="flex gap-2">
                  <div className="h-3 w-10 rounded-lg bg-slate-200" />
                  <div className="h-3 w-10 rounded-lg bg-slate-200" />
                </div>
              </div>
              <div className="grid min-h-64 place-items-center rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6 text-center">
                <div>
                  <Globe2 className="mx-auto mb-3 text-blue-600" />
                  <p className="font-semibold text-slate-950">Preview placeholder</p>
                  <p className="mt-2 text-sm text-slate-600">Generated UI preview will appear here.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
