// components/SimulationForm/index.tsx
'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';
import { CurrentPlanForm } from './CurrentPlanForm';
import { RequirementsForm } from './RequirementsForm';
import { AddonsForm } from './AddonsForm';
import { useToast } from '@/components/ui/use-toast';

// フォームのバリデーションスキーマ
const FormSchema = z.object({
  currentPlan: z.object({
    monthlyCost: z.number().min(0, '0以上の数値を入力してください'),
    dataUsage: z.number().min(0, '0以上の数値を入力してください'),
    familyMembers: z.number().min(1, '1以上の数値を入力してください').max(10, '最大10人まで入力可能です'),
  }),
  requirements: z.object({
    deviceType: z.enum(['mobile', 'home', 'both']),
    usageLocation: z.array(z.string()).min(1, '少なくとも1つの利用場所を入力してください'),
    contractStatus: z.enum(['new', 'transfer']),
    speedPriority: z.enum(['stable', 'maximum']),
  }),
  addons: z.object({
    internationalRoaming: z.boolean(),
    dataSharing: z.boolean(),
    disasterMode: z.boolean(),
  }),
});

export type FormValues = z.infer<typeof FormSchema>;

export default function SimulationForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPlan: {
        monthlyCost: 0,
        dataUsage: 0,
        familyMembers: 1,
      },
      requirements: {
        deviceType: 'both',
        usageLocation: [],
        contractStatus: 'new',
        speedPriority: 'stable',
      },
      addons: {
        internationalRoaming: false,
        dataSharing: false,
        disasterMode: false,
      },
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('推奨プランの取得に失敗しました');
      }
      
      const result = await response.json();
      
      // 結果ページへリダイレクト
      router.push(`/results?id=${result.resultId}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : '推奨プランの取得に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    const fields = [
      ['currentPlan.monthlyCost', 'currentPlan.dataUsage', 'currentPlan.familyMembers'],
      ['requirements.deviceType', 'requirements.usageLocation', 'requirements.contractStatus', 'requirements.speedPriority'],
      ['addons.internationalRoaming', 'addons.dataSharing', 'addons.disasterMode'],
    ];
    
    // 現在のステップのフィールドを検証
    methods.trigger(fields[step] as any).then((isValid) => {
      if (isValid) {
        setStep((prev) => Math.min(prev + 1, 2));
      }
    });
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">あなたに最適な通信プランを見つけましょう</CardTitle>
        <CardDescription className="text-blue-100">
          質問に答えるだけで、最適なプランを提案します
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Stepper activeStep={step} className="mb-8">
          <Stepper.Step label="現在のプラン情報" />
          <Stepper.Step label="ご利用要件" />
          <Stepper.Step label="オプション設定" />
        </Stepper>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 && <CurrentPlanForm />}
            {step === 1 && <RequirementsForm />}
            {step === 2 && <AddonsForm />}
            
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button type="button" onClick={prevStep} variant="outline">
                  前へ戻る
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 2 ? (
                <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  次へ進む
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '処理中...' : 'プランを比較する'}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
