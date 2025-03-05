// prisma/seed.ts
import { PrismaClient, CarrierType, DeviceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // キャリアデータのシード
  const carriers = [
    // 大手キャリア
    {
      name: 'ドコモ',
      type: CarrierType.MOBILE,
      description: 'NTTドコモは日本最大の携帯電話事業者です。広いエリアカバレッジと安定した通信品質が特徴です。',
    },
    {
      name: 'au',
      type: CarrierType.MOBILE,
      description: 'auはKDDIが提供する携帯電話サービスです。山間部でも繋がりやすいと評判です。',
    },
    {
      name: 'SoftBank',
      type: CarrierType.MOBILE,
      description: 'ソフトバンクは都市部での高速通信に強みを持つキャリアです。',
    },
    {
      name: '楽天モバイル',
      type: CarrierType.MOBILE,
      description: '楽天モバイルは第4のキャリアとして参入し、シンプルな料金体系が特徴です。',
    },
    // オンライン専用プラン
    {
      name: 'ahamo',
      type: CarrierType.MOBILE,
      description: 'ahamoはドコモのオンライン専用プランです。手続きはすべてオンラインで完結します。',
    },
    {
      name: 'povo',
      type: CarrierType.MOBILE,
      description: 'povoはauのオンライン専用ブランドで、必要なトッピングだけを追加できる柔軟なプランが特徴です。',
    },
    {
      name: 'LINEMO',
      type: CarrierType.MOBILE,
      description: 'LINEMOはソフトバンクのオンライン専用プランです。LINEの年齢確認済みアカウントが無料で使えます。',
    },
    // サブブランド・MVNO
    {
      name: 'UQモバイル',
      type: CarrierType.MOBILE,
      description: 'UQモバイルはauの回線を利用した格安SIMサービスです。お手頃な料金が魅力です。',
    },
    {
      name: 'Ymobile',
      type: CarrierType.MOBILE,
      description: 'Ymobileはソフトバンクの子会社が提供する格安SIMサービスです。安定した通信品質とリーズナブルな価格が特徴です。',
    },
    {
      name: 'mineo',
      type: CarrierType.MOBILE,
      description: 'mineoはドコモ・au・ソフトバンクの回線が選べるMVNOです。パケットシェアなどユニークなサービスがあります。',
    },
    {
      name: '日本通信',
      type: CarrierType.MOBILE,
      description: '日本通信は老舗MVNOで、独自の料金プランを提供しています。ビジネス向けのプランも充実しています。',
    },
    {
      name: 'IIJmio',
      type: CarrierType.MOBILE,
      description: 'IIJmioはインターネットイニシアティブが提供するMVNOサービスです。技術力の高さに定評があります。',
    },
    {
      name: 'イオンモバイル',
      type: CarrierType.MOBILE,
      description: 'イオンモバイルは大手小売チェーンが提供する格安SIMです。イオンでのポイント還元が魅力です。',
    },
    // ホームルーター
    {
      name: 'WiMAX',
      type: CarrierType.HOME_ROUTER,
      description: 'WiMAXは高速・大容量のモバイルインターネット回線サービスです。自宅でも外出先でも利用可能です。',
    },
    {
      name: 'SoftBank Air',
      type: CarrierType.HOME_ROUTER,
      description: 'SoftBank Airはソフトバンクが提供する据え置き型のホームルーターです。工事不要ですぐに使えます。',
    },
    {
      name: 'docomo home5G',
      type: CarrierType.HOME_ROUTER,
      description: 'docomo home5Gはドコモが提供する5G対応の据え置き型ホームルーターです。高速通信と大容量データ通信が特徴です。',
    },
    // 光回線
    {
      name: 'NURO光',
      type: CarrierType.FIBER,
      description: 'NURO光はSo-netが提供する超高速光回線サービスです。下り最大2Gbpsの高速通信が可能です。',
    },
    {
      name: 'auひかり',
      type: CarrierType.FIBER,
      description: 'auひかりはKDDIが提供する光回線サービスです。auスマートバリューとの組み合わせでスマホ料金がお得になります。',
    },
    {
      name: 'ドコモ光',
      type: CarrierType.FIBER,
      description: 'ドコモ光はNTTドコモが提供する光回線サービスです。ドコモのスマホとセットで割引が適用されます。',
    },
    {
      name: 'SoftBank光',
      type: CarrierType.FIBER,
      description: 'SoftBank光はソフトバンクが提供する光回線サービスです。ソフトバンクスマホとのセット割引が適用できます。',
    },
    {
      name: 'So-net光',
      type: CarrierType.FIBER,
      description: 'So-net光はSo-netが提供する光回線サービスです。安定した通信速度と手頃な料金が特徴です。',
    },
    {
      name: 'ASAHIネット',
      type: CarrierType.FIBER,
      description: 'ASAHIネットは老舗プロバイダが提供する光回線サービスです。手厚いサポートに定評があります。',
    },
    {
      name: '楽天ひかり',
      type: CarrierType.FIBER,
      description: '楽天ひかりは楽天が提供する光回線サービスです。楽天市場でのお買い物がポイント還元されます。',
    },
    // モバイルルーター
    {
      name: 'Rakuten WiFi Pocket',
      type: CarrierType.MOBILE_ROUTER,
      description: 'Rakuten WiFi Pocketは楽天モバイルが提供するモバイルWiFiルーターです。',
    },
  ];

  // キャリアデータの登録
  for (const carrier of carriers) {
    await prisma.carrier.upsert({
      where: { name: carrier.name },
      update: carrier,
      create: carrier,
    });
  }

  // 登録したキャリア情報を取得
  const carrierEntities = await prisma.carrier.findMany();
  const carrierMap = new Map(carrierEntities.map(c => [c.name, c]));

  // プランデータのシード
  const plans = [
    // ドコモのプラン
    {
      name: 'irumo',
      carrierId: carrierMap.get('ドコモ')!.id,
      baseFee: 3465,
      dataLimit: 4,
      throttleSpeed: 1000,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 5,
      familyDiscountRate: 15,
      isRecommended: false,
      isPopular: true,
      features: ['5G対応', 'ドコモショップでのサポート', 'dポイント付与'],
    },
    {
      name: 'ahamo',
      carrierId: carrierMap.get('ahamo')!.id,
      baseFee: 2970,
      dataLimit: 20,
      throttleSpeed: 1000,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: false,
      isRecommended: true,
      isPopular: true,
      features: ['5G対応', 'オンライン完結', '海外ローミング20GB'],
    },
    // auのプラン
    {
      name: '使い放題MAX 5G/4G',
      carrierId: carrierMap.get('au')!.id,
      baseFee: 7238,
      dataLimit: null, // 無制限
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 20,
      isRecommended: false,
      isPopular: false,
      features: ['データ無制限', '5G対応', 'auショップでのサポート'],
    },
    {
      name: 'povo2.0',
      carrierId: carrierMap.get('povo')!.id,
      baseFee: 0, // 基本料0円+トッピング
      dataLimit: 0,
      throttleSpeed: 300,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: false,
      isRecommended: true,
      isPopular: true,
      features: ['基本料0円', 'データトッピング', '5G対応', 'オンライン完結'],
    },
    // SoftBankのプラン
    {
      name: 'メリハリ無制限',
      carrierId: carrierMap.get('SoftBank')!.id,
      baseFee: 7238,
      dataLimit: null, // 無制限
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 20,
      isRecommended: false,
      isPopular: false,
      features: ['データ無制限', '5G対応', 'ソフトバンクショップでのサポート'],
    },
    {
      name: 'LINEMO ミニプラン',
      carrierId: carrierMap.get('LINEMO')!.id,
      baseFee: 990,
      dataLimit: 3,
      throttleSpeed: 300,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: false,
      isRecommended: false,
      isPopular: true,
      features: ['格安料金', '5G対応', 'LINE年齢確認済みアカウント', 'オンライン完結'],
    },
    // 楽天モバイルのプラン
    {
      name: 'Rakuten UN-LIMIT VII',
      carrierId: carrierMap.get('楽天モバイル')!.id,
      baseFee: 3278,
      dataLimit: null, // 無制限
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: false,
      isRecommended: true,
      isPopular: true,
      features: ['データ無制限', '5G対応', '楽天ポイント還元', 'オンライン完結'],
    },
    // UQモバイルのプラン
    {
      name: 'くりこしプランS +5G',
      carrierId: carrierMap.get('UQモバイル')!.id,
      baseFee: 1628,
      dataLimit: 3,
      throttleSpeed: 300,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 6,
      isRecommended: false,
      isPopular: true,
      features: ['格安料金', '5G対応', 'くりこしデータ'],
    },
    // Ymobileのプラン
    {
      name: 'シンプルS',
      carrierId: carrierMap.get('Ymobile')!.id,
      baseFee: 2178,
      dataLimit: 3,
      throttleSpeed: 300,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 500, // 円単位
      isRecommended: false,
      isPopular: true,
      features: ['格安料金', '5G対応', 'ソフトバンク回線'],
    },
    // 日本通信のプラン
    {
      name: '合理的20GBプラン',
      carrierId: carrierMap.get('日本通信')!.id,
      baseFee: 1958,
      dataLimit: 20,
      throttleSpeed: 200,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: false,
      isRecommended: false,
      isPopular: false,
      features: ['20GBデータ', 'ドコモ回線', '音声通話'],
    },
    // IIJmioのプラン
    {
      name: 'ギガプランミニ',
      carrierId: carrierMap.get('IIJmio')!.id,
      baseFee: 1078,
      dataLimit: 2,
      throttleSpeed: 200,
      contractPeriod: 0,
      cancellationFee: 0,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 110, // 円単位
      isRecommended: false,
      isPopular: false,
      features: ['マルチキャリア', 'データシェア', 'セキュリティオプション'],
    },
    // WiMAXのプラン
    {
      name: 'ギガ放題プラス',
      carrierId: carrierMap.get('WiMAX')!.id,
      baseFee: 4268,
      dataLimit: null, // 無制限
      throttleSpeed: 1000,
      contractPeriod: 24,
      cancellationFee: 1100,
      familyDiscount: false,
      isRecommended: true,
      isPopular: true,
      features: ['データ無制限', '5G対応', '持ち運び可能', 'クラウドSIM'],
    },
    // SoftBank Airのプラン
    {
      name: 'SoftBank Air',
      carrierId: carrierMap.get('SoftBank Air')!.id,
      baseFee: 5368,
      dataLimit: null, // 無制限
      throttleSpeed: 1000,
      contractPeriod: 24,
      cancellationFee: 10450,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 1100, // 円単位
      isRecommended: false,
      isPopular: false,
      features: ['工事不要', 'データ無制限', 'おうち割'],
    },
    // docomo home5Gのプラン
    {
      name: 'home 5G プラン',
      carrierId: carrierMap.get('docomo home5G')!.id,
      baseFee: 4950,
      dataLimit: null, // 無制限
      throttleSpeed: 1000,
      contractPeriod: 24,
      cancellationFee: 4730,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 1100, // 円単位
      isRecommended: true,
      isPopular: true,
      features: ['5G対応', 'データ無制限', 'ドコモ回線', 'ホームセット割'],
    },
    // NURO光のプラン
    {
      name: 'NURO光 2Gbps',
      carrierId: carrierMap.get('NURO光')!.id,
      baseFee: 5200,
      dataLimit: null, // 無制限
      contractPeriod: 24,
      cancellationFee: 10450,
      familyDiscount: false,
      isRecommended: false,
      isPopular: true,
      features: ['最大2Gbps', 'IPv6対応', 'Wi-Fiルーター付き'],
    },
    // auひかりのプラン
    {
      name: 'auひかり ホーム1ギガ',
      carrierId: carrierMap.get('auひかり')!.id,
      baseFee: 5610,
      dataLimit: null, // 無制限
      contractPeriod: 24,
      cancellationFee: 4730,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 1100, // 円単位
      isRecommended: true,
      isPopular: true,
      features: ['最大1Gbps', 'auスマートバリュー', 'Wi-Fiルーター付き'],
    },
    // ドコモ光のプラン
    {
      name: 'ドコモ光 1ギガ',
      carrierId: carrierMap.get('ドコモ光')!.id,
      baseFee: 5720,
      dataLimit: null, // 無制限
      contractPeriod: 24,
      cancellationFee: 4730,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 1100, // 円単位
      isRecommended: false,
      isPopular: true,
      features: ['最大1Gbps', 'ドコモ光セット割', 'Wi-Fiルーター付き'],
    },
    // SoftBank光のプラン
    {
      name: 'SoftBank光 1ギガ',
      carrierId: carrierMap.get('SoftBank光')!.id,
      baseFee: 5720,
      dataLimit: null, // 無制限
      contractPeriod: 24,
      cancellationFee: 10450,
      familyDiscount: true,
      familyMaxLines: 10,
      familyDiscountRate: 1100, // 円単位
      isRecommended: false,
      isPopular: true,
      features: ['最大1Gbps', 'おうち割光セット', 'Wi-Fiマルチパック'],
    },
  ];

  // プランデータの登録
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { 
        id: 0 // ダミー値（実際にはname+carrierIdの複合一意制約が必要）
      },
      update: {},
      create: plan,
    });
  }

  // デバイスデータのシード
  const devices = [
    // ホームルーター
    {
      name: 'WiMAX HOME 5G L13',
      type: DeviceType.HOME_ROUTER,
      carrierId: carrierMap.get('WiMAX')!.id,
      maxDownloadSpeed: 4.2,
      maxUploadSpeed: 0.183,
      supportedBands: ['n78 (3.7GHz)', 'n79 (4.5GHz)'],
      wifiStandard: 'Wi-Fi 6',
      maxConnections: 40,
      batteryLife: null, // 据え置き型のため
      portConfiguration: JSON.stringify({
        ethernet: '10Gbps × 2',
        usb: 'USB-C PD × 1'
      }),
      dimensions: '幅80mm × 高さ100mm × 奥行80mm',
      weight: 460,
      releaseDate: new Date('2023-04-01'),
      image: '/images/devices/wimax-home-5g-l13.jpg',
    },
    {
      name: 'SoftBank Air ターミナル 5',
      type: DeviceType.HOME_ROUTER,
      carrierId: carrierMap.get('SoftBank Air')!.id,
      maxDownloadSpeed: 3.4,
      maxUploadSpeed: 0.183,
      supportedBands: ['n78 (3.7GHz)', 'n257 (28GHz)'],
      wifiStandard: 'Wi-Fi 6',
      maxConnections: 30,
      batteryLife: null, // 据え置き型のため
      portConfiguration: JSON.stringify({
        ethernet: '1Gbps × 2',
        usb: 'USB-A × 1'
      }),
      dimensions: '幅90mm × 高さ120mm × 奥行90mm',
      weight: 480,
      releaseDate: new Date('2023-08-01'),
      image: '/images/devices/softbank-air-terminal-5.jpg',
    },
    {
      name: 'docomo home 5G HR01',
      type: DeviceType.HOME_ROUTER,
      carrierId: carrierMap.get('docomo home5G')!.id,
      maxDownloadSpeed: 4.2,
      maxUploadSpeed: 0.218,
      supportedBands: ['n78 (3.7GHz)', 'n257 (28GHz)'],
      wifiStandard: 'Wi-Fi 6',
      maxConnections: 32,
      batteryLife: null, // 据え置き型のため
      portConfiguration: JSON.stringify({
        ethernet: '2.5Gbps × 1, 1Gbps × 3',
        usb: 'USB-A × 2'
      }),
      dimensions: '幅85mm × 高さ180mm × 奥行85mm',
      weight: 510,
      releaseDate: new Date('2023-03-01'),
      image: '/images/devices/docomo-home-5g-hr01.jpg',
    },
    // モバイルルーター
    {
      name: 'Speed Wi-Fi 5G X11',
      type: DeviceType.MOBILE_ROUTER,
      carrierId: carrierMap.get('WiMAX')!.id,
      maxDownloadSpeed: 2.7,
      maxUploadSpeed: 0.183,
      supportedBands: ['n78 (3.7GHz)', 'n257 (28GHz)'],
      wifiStandard: 'Wi-Fi 6',
      maxConnections: 16,
      batteryLife: 480, // 8時間
      portConfiguration: JSON.stringify({
        usb: 'USB-C × 1'
      }),
      dimensions: '幅74mm × 高さ139mm × 奥行13.3mm',
      weight: 150,
      releaseDate: new Date('2022-11-01'),
      image: '/images/devices/speed-wifi-5g-x11.jpg',
    },
    {
      name: 'Rakuten WiFi Pocket 2C',
      type: DeviceType.MOBILE_ROUTER,
      carrierId: carrierMap.get('Rakuten WiFi Pocket')!.id,
      maxDownloadSpeed: 0.15,
      maxUploadSpeed: 0.05,
      supportedBands: ['Band 3', 'Band 18'],
      wifiStandard: 'Wi-Fi 5',
      maxConnections: 10,
      batteryLife: 600, // 10時間
      portConfiguration: JSON.stringify({
        usb: 'USB-C × 1'
      }),
      dimensions: '幅60mm × 高さ100mm × 奥行10mm',
      weight: 110,
      releaseDate: new Date('2021-03-01'),
      image: '/images/devices/rakuten-wifi-pocket-2c.jpg',
    },
  ];

  // デバイスデータの登録
  for (const device of devices) {
    await prisma.device.upsert({
      where: {
        id: 0 // ダミー値（実際にはname+carrierIdの複合一意制約が必要）
      },
      update: {},
      create: device,
    });
  }

  // プランとデバイスの関連付け
  // 実際のデータベースからIDを取得してから関連付けるコードが必要

  console.log('データベースのシードが完了しました');
}

main()
  .catch((e) => {
    console.error('シード処理中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
