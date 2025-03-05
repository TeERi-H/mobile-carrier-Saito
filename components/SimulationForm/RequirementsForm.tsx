// components/SimulationForm/RequirementsForm.tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { InfoCircle, Smartphone, Home, Wifi } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function RequirementsForm() {
  const { control, watch, setValue } = useFormContext();
  
  // 郵便番号入力時の処理
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.match(/^\d{3}-?\d{4}$/)) {
      // 郵便番号が正しい形式の場合、usageLocationに追加
      setValue('requirements.usageLocation', [value]);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">ご利用要件</h2>
      <p className="text-gray-600">
        どのような環境でご利用になるかをお選びください。
      </p>
      
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <FormField
            control={control}
            name="requirements.deviceType"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="flex justify-between items-center">
                  <FormLabel>主に利用するデバイス</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>主に使用する通信手段をお選びください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="mobile" id="mobile" className="sr-only peer" />
                      <Label
                        htmlFor="mobile"
                        className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <Smartphone className="w-10 h-10 mb-2 text-blue-600" />
                        <span>携帯電話</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="home" id="home" className="sr-only peer" />
                      <Label
                        htmlFor="home"
                        className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <Home className="w-10 h-10 mb-2 text-green-600" />
                        <span>自宅回線</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="both" id="both" className="sr-only peer" />
                      <Label
                        htmlFor="both"
                        className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <Wifi className="w-10 h-10 mb-2 text-orange-600" />
                        <span>両方</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="requirements.usageLocation"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="flex justify-between items-center">
                  <FormLabel>主な利用場所</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>主に利用する地域の郵便番号を入力してください。エリア品質の確認に使用します。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="例: 123-4567"
                      onChange={handlePostalCodeChange}
                      className="pr-36"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      郵便番号
                    </div>
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  {field.value && field.value.length > 0 ? (
                    <>設定済み: {field.value.join(', ')}</>
                  ) : (
                    <>未設定</>
                  )}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="requirements.contractStatus"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="flex justify-between items-center">
                  <FormLabel>契約状況</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>新規契約か乗り換え（MNP）かをお選びください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="new" id="new" className="sr-only peer" />
                      <Label
                        htmlFor="new"
                        className="flex items-center justify-center p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <span>新規契約</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="transfer" id="transfer" className="sr-only peer" />
                      <Label
                        htmlFor="transfer"
                        className="flex items-center justify-center p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <span>乗り換え（MNP）</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="requirements.speedPriority"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>重視するポイント</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircle size={16} className="text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>最大速度を重視するか、安定性を重視するかをお選びください。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="maximum" id="maximum" className="sr-only peer" />
                      <Label
                        htmlFor="maximum"
                        className="flex items-center justify-center p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <span>最大速度</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="stable" id="stable" className="sr-only peer" />
                      <Label
                        htmlFor="stable"
                        className="flex items-center justify-center p-4 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 hover:bg-gray-100"
                      >
                        <span>安定性</span>
                      </Label>
                    </div>
                  </RadioGroup>
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
