import { Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CLIToolTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Download CLI Tool</h1>
      <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Terminal className="h-5 w-5 text-purple-400 mr-2" />
            Download CLI Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-purple-200 text-sm">
            Download the Hades CLI tool to manage your cybersecurity tasks directly from your terminal. Choose your operating system below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Windows */}
            <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/windows.svg"
                  alt="Windows Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-white font-semibold mb-2">Windows</h4>
              <p className="text-purple-300 text-xs mb-4">Compatible with Windows 10 and above</p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                onClick={() => window.open('/downloads/hades-cli-windows.exe', '_blank')}
              >
                Download
              </Button>
            </div>

            {/* macOS */}
            <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/macos.svg"
                  alt="macOS Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-white font-semibold mb-2">macOS</h4>
              <p className="text-purple-300 text-xs mb-4">Compatible with macOS 11.0 and above</p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                onClick={() => window.open('/downloads/hades-cli-macos.zip', '_blank')}
              >
                Download
              </Button>
            </div>

            {/* Linux */}
            <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/linux.svg"
                  alt="Linux Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-white font-semibold mb-2">Linux</h4>
              <p className="text-purple-300 text-xs mb-4">Compatible with major Linux distributions</p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                onClick={() => window.open('/downloads/hades-cli-linux.tar.gz', '_blank')}
              >
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}