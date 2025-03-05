// components/SimulationForm/CurrentPlanForm.tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { InfoCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function CurrentPlanForm() {
  const { control, watch, setValue } = useFormContext();
  
  // 現在の値を監視
  const monthlyCost = watch('currentPlan.monthlyCost');
  const dataUsage = watch('currentPlan.dataUsage');
  const familyMembers = watch('currentPlan.familyMembers');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">現在のプラン情報</h2>
      <p className="text-gray-600">
        最適なプランを提案するために、現在のご利用状況をお聞かせください。
      </p>
      
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <FormField
            control={control}
            name="currentPlan.monthlyCost"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="flex justify-between items-center">
                  <FormLabel>現在の月額料金（円）</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>税込の月額料金を入力してください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="例: 5000"
                      min={0}
                      step={100}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      円
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="currentPlan.dataUsage"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="flex justify-between items-center">
                  <FormLabel>月間データ使用量（GB）</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>平均的な月のデータ使用量を入力してください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="space-y-3">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">0 GB</span>
                      <span className="text-sm font-medium">{dataUsage} GB</span>
                      <span className="text-sm text-gray-500">100 GB+</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="currentPlan.familyMembers"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>ご家族の利用人数</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>家族割引を適用する人数です。ご本人を含めてください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="例: 3"
                      min={1}
                      max={10}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      人
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
