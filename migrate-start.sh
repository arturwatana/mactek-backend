#!/bin/bash

sleep 3
npx prisma generate
npx prisma db push
npm run dev