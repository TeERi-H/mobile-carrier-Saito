// components/SimulationForm/AddonsForm.tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Users, Shield } from 'lucide-react';

export function AddonsForm() {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">オプション設定</h2>
      <p className="text-gray-600">
        必要に応じて追加のオプションをお選びください。
      </p>
      
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <FormField
            control={control}
            name="addons.internationalRoaming"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4 mb-4">
                <Plane className="text-blue-500 mt-1" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <FormLabel>海外ローミング</FormLabel>
                      <FormDescription>
                        海外でもデータ通信を利用する予定がある場合に選択してください。
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="addons.dataSharing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4 mb-4">
                <Users className="text-green-500 mt-1" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <FormLabel>データシェアリング</FormLabel>
                      <FormDescription>
                        複数の端末や家族間でデータ容量を共有したい場合に選択してください。
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="addons.disasterMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
                <Shield className="text-red-500 mt-1" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <FormLabel>災害時対応</FormLabel>
                      <FormDescription>
                        災害時の通信確保が重要な場合に選択してください。災害時の優先接続や緊急速報に対応したプランを提案します。
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
