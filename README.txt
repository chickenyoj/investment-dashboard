Investment Dashboard - Step 4

Changes:
- Renamed from PSE Personal AI Dashboard to Investment Dashboard
- Changed localStorage key from pseStocks to investmentDashboard
- Fixed delete-all/default reload issue
- Updated AI prompt for broader investment portfolio use
- Keeps OpenAI backend through /api/analyze

Deployment:
1. Upload index.html, package.json, and api/analyze.js to GitHub.
2. Import repository into Vercel.
3. Add environment variable:
   OPENAI_API_KEY = your OpenAI API key
4. Deploy.
