import axiosClient from './axiosClient.ts';

interface CreateQrPayload {
  items: string[];
  voucherCode?: string | null;
  usedXu?: number;
}

interface CreateQrResponse {
  success: boolean;
  url: string;
}

export const paymentApi = {
  createQr: async (payload: CreateQrPayload): Promise<CreateQrResponse> => {
    return await axiosClient.post('/payment/create-qr', payload);
  },
  checkPayment: async (queryString: string): Promise<any> => {
    return await axiosClient.get(`/payment/vnpay_return${queryString}`);
  }
};
