export interface BlogData {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'; // enum স্টাইলে রাখা ভালো
  createdAt: string | Date; // ISO string হিসেবে আসে
  updatedAt: string | Date;
  tags: string[]; // যেহেতু ডাটাতে [Array] দেখাচ্ছে, সাধারণত স্ট্রিং এর অ্যারে হয়
  views: number;
  authorId: string;
  _count: {
    [key: string]: number; // লাইক বা কমেন্ট কাউন্টের জন্য
  };
}