# البروتوكول — برنامج تمارين منزلي بالدمبل والعقلة

برنامج تمارين منزلي (React + Vite) بأربعة أيام تدريبية (دفع / سحب / أرجل / كور)، فيديوهات يوتيوب حقيقية شغالة داخل الصفحة، ومتابعة يومية محفوظة في متصفحك (localStorage).

## التشغيل محليًا

```bash
npm install
npm run dev
```

يفتح على `http://localhost:5173`.

## رفعه على GitHub ونشره مجانًا (GitHub Pages)

### 1) إنشاء المستودع (Repository)
1. روح على github.com واعمل **New repository** — سمّيه مثلًا `dumbbell-workout`.
2. سيبه **Public** ومن غير ما تضيف README (عندك واحد جاهز).

### 2) رفع الكود
من داخل مجلد المشروع على جهازك:

```bash
git init
git add .
git commit -m "أول نسخة من برنامج التمارين"
git branch -M main
git remote add origin https://github.com/USERNAME/dumbbell-workout.git
git push -u origin main
```

استبدل `USERNAME` باسم حسابك على GitHub.

### 3) تفعيل GitHub Pages
1. من صفحة المستودع على GitHub: **Settings → Pages**.
2. تحت **Build and deployment → Source** اختار **GitHub Actions**.
3. كده خلاص — الـ workflow الموجود في `.github/workflows/deploy.yml` هيشتغل تلقائيًا مع كل `push` على `main`، ويبني الموقع وينشره.

بعد أول عملية نشر (تقدر تتابعها من تبويب **Actions** في المستودع)، هتلاقي رابط موقعك في **Settings → Pages** بالشكل:

```
https://USERNAME.github.io/dumbbell-workout/
```

### تحديث الموقع لاحقًا
أي تعديل في الكود، اعمله ثم:

```bash
git add .
git commit -m "وصف التعديل"
git push
```

وهيتحدث الموقع تلقائيًا خلال دقيقة أو اتنين.

## ملاحظات
- التمارين والفيديوهات في `src/App.jsx` — أي تعديل (إضافة تمرين، تغيير فيديو، تغيير نص) يبقى هناك.
- التقدم اليومي (التمارين اللي بتعلّمها ✓) بيتخزن في متصفح المستخدم نفسه فقط (localStorage) — مفيش سيرفر أو قاعدة بيانات.
- الفيديوهات مضمّنة عبر `youtube-nocookie.com` فتشتغل جوا الصفحة من غير ما تنقل حد لليوتيوب.
