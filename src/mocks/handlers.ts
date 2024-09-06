import { http, HttpResponse } from "msw";
import {
    addBulkDataToLocalStorage,
  addDataToLocalStorage,
  getDataFromLocalStorage,
  putDataToLocalStorage,
} from "../utils/localStorage";

const mockData = [
  {
    type: "bank-draft",
    title: "Bank Draft",
    position: 0,
    src: "https://cdn.dribbble.com/userupload/11613075/file/original-24c46200b2b730e2edf115be5e1a8cb8.png?resize=1504x1128",
  },
  {
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    src: "https://cdn.dribbble.com/userupload/16375695/file/original-4ee2dea861b5aeafe122f78d51579270.png?resize=1504x1128",
  },
  {
    type: "invoice",
    title: "Invoice",
    position: 2,
    src: "https://cdn.dribbble.com/userupload/14670198/file/original-a0d57ffca2ed9405bb46e17fcd2cef4a.png?resize=1504x1128",
  },
  {
    type: "bank-draft-2",
    title: "Bank Draft 2",
    position: 3,
    src: "https://cdn.dribbble.com/userupload/16142122/file/original-a25ca1b1a9d9fde4c6f3cab4a9a1530e.jpg?resize=1504x1128",
  },
  {
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    position: 4,
    src: "https://cdn.dribbble.com/userupload/12484957/file/original-d2278ae7ca2d6de04fec397bdc4bc210.png?resize=1504x643",
  },
];

type GetResponseType = {
  type: string;
  title: string;
  position: number;
  src: string;
}[];

type PostReqBody = {
  type: string;
  title: string;
  position: number;
  src: string;
};

type PutReqBody = {
    type: string;
    title: string;
    position: number;
    src: string;
  }[];

type PostResponseType = {
  success: boolean;
};

export const handlers = [
  // Fetch all cards from LocalStorage
  http.get<any, any, GetResponseType, "/api/cards">(
    "/api/cards",
    async ({ params, request }) => {
      console.log('[GET CALLED]')
      const existingData = getDataFromLocalStorage();
      if (!existingData || existingData.length === 0) {
        addBulkDataToLocalStorage(mockData);
      }

      const cards = getDataFromLocalStorage();
      return HttpResponse.json(cards);
    }
  ),

  // Add a new card to LocalStorage
  http.post<any, PostReqBody, PostResponseType>(
    "/api/cards",
    async ({ request, params }) => {
        console.log('[POST CALLED]')
      const newCard = await request.json();
      addDataToLocalStorage(newCard);
      return HttpResponse.json({ success: true });
    }
  ),

  http.put<any, PutReqBody, PostResponseType>(
    "/api/cards/",
    async ({ request, params }) => {
        console.log('[PUT CALLED]')
      const newCard = await request.json();
      putDataToLocalStorage(newCard);
      return HttpResponse.json({ success: true });
    }
  ),
];
