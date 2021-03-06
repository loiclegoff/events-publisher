import { google } from 'googleapis';
import { Event } from '@/types/event';
import { NextApiRequest, NextApiResponse } from 'next';

const googleScopes = [`https://www.googleapis.com/auth/spreadsheets.readonly`];

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const data: Event[] = [];

  try {
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, `\n`),
      googleScopes,
    );
    const sheets = google.sheets({ version: `v4`, auth: jwt });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `api`,
    });

    const rows = response.data.values;

    if (rows?.length) {
      rows.forEach((row, i) => {
        if (i !== 0 && row[2] !== ``) {
          const scopes = [] as string[];
          data.push({
            scopes,
            startDate: new Date(row[0]),
            endDate: new Date(row[1]),
            title: row[2],
            description: row[3],
            location: row[4],
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ events: data });
};
