import { saveSettings } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

function Field({
  name,
  label,
  defaultValue,
  ltr,
  area,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  ltr?: boolean;
  area?: boolean;
}) {
  const cls = "mt-1 w-full rounded-md border px-3 py-2";
  return (
    <label className="block">
      {label}
      {area ? (
        <textarea name={name} rows={5} defaultValue={defaultValue} className={cls} />
      ) : (
        <input name={name} defaultValue={defaultValue} className={cls} dir={ltr ? "ltr" : undefined} />
      )}
    </label>
  );
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const s = await getSettings();
  const { saved } = await searchParams;
  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">سائٹ کی سیٹنگز</h1>
      <p className="mt-2 text-sm leading-8">یہ تمام عبارتیں ویب سائٹ پر نظر آتی ہیں۔ یہاں بدل کر محفوظ کریں۔</p>
      {saved ? <p className="mt-3 rounded-md bg-green/10 p-3 text-green">محفوظ ہو گئیں۔</p> : null}
      <form action={saveSettings} className="mt-6 max-w-3xl space-y-8">
        <section className="site-card space-y-3 rounded-xl p-6">
          <h2 className="font-display text-xl text-maroon">شناخت</h2>
          <Field name="clinicNameUrdu" label="نام اردو" defaultValue={s.clinicNameUrdu} />
          <Field name="clinicNameEn" label="نام انگریزی" defaultValue={s.clinicNameEn} ltr />
          <Field name="tagline" label="ٹیگ لائن" defaultValue={s.tagline} />
          <Field name="heroIntro" label="اوپر چھوٹی سطر" defaultValue={s.heroIntro} />
          <ImageField name="logoUrl" defaultUrl={s.logoUrl} label="لوگو" />
          <Field name="aboutText" label="تعارف / صفحہ اول کی تفصیل" defaultValue={s.aboutText} area />
        </section>

        <section className="site-card space-y-3 rounded-xl p-6">
          <h2 className="font-display text-xl text-maroon">رابطہ</h2>
          <Field name="phone1" label="فون ۱" defaultValue={s.phone1} ltr />
          <Field name="phone2" label="فون ۲" defaultValue={s.phone2} ltr />
          <Field name="whatsapp1" label="واٹس ایپ ۱ (92 سے شروع)" defaultValue={s.whatsapp1} ltr />
          <Field name="whatsapp2" label="واٹس ایپ ۲ (92 سے شروع)" defaultValue={s.whatsapp2} ltr />
          <Field name="whatsappLabel" label="واٹس ایپ کا لفظ" defaultValue={s.whatsappLabel} />
          <Field name="callLabel" label="فون کا لفظ" defaultValue={s.callLabel} />
          <Field name="address" label="پتہ" defaultValue={s.address} />
          <Field name="hours" label="اوقات" defaultValue={s.hours} />
          <Field name="mapUrl" label="گوگل میپ لنک" defaultValue={s.mapUrl} ltr />
        </section>

        <section className="site-card space-y-3 rounded-xl p-6">
          <h2 className="font-display text-xl text-maroon">مینو / نبار</h2>
          <Field name="navHome" label="صفحہ اول" defaultValue={s.navHome} />
          <Field name="navAbout" label="تعارف" defaultValue={s.navAbout} />
          <Field name="navMedicines" label="ادویات" defaultValue={s.navMedicines} />
          <Field name="navBooks" label="کتب" defaultValue={s.navBooks} />
          <Field name="navBlog" label="بلاگ" defaultValue={s.navBlog} />
          <Field name="navGallery" label="تصاویر" defaultValue={s.navGallery} />
          <Field name="navContact" label="رابطہ" defaultValue={s.navContact} />
        </section>

        <section className="site-card space-y-3 rounded-xl p-6">
          <h2 className="font-display text-xl text-maroon">صفحہ اول کے عنوان</h2>
          <Field name="eldersHeading" label="بزرگ عنوان" defaultValue={s.eldersHeading} />
          <Field name="eldersText" label="بزرگ تفصیل" defaultValue={s.eldersText} area />
          <Field name="offersHeading" label="آفرز عنوان" defaultValue={s.offersHeading} />
          <Field name="medicinesHeading" label="ادویات عنوان" defaultValue={s.medicinesHeading} />
          <Field name="booksHeading" label="کتب عنوان" defaultValue={s.booksHeading} />
          <Field name="blogHeading" label="بلاگ عنوان" defaultValue={s.blogHeading} />
          <Field name="galleryHeading" label="گیلری عنوان" defaultValue={s.galleryHeading} />
        </section>

        <section className="site-card space-y-3 rounded-xl p-6">
          <h2 className="font-display text-xl text-maroon">فوٹر</h2>
          <Field name="footerPagesTitle" label="صفحات کا عنوان" defaultValue={s.footerPagesTitle} />
          <Field name="footerContactTitle" label="رابطہ کا عنوان" defaultValue={s.footerContactTitle} />
          <Field name="footerDisclaimer" label="نوٹ / ڈس کلیمر" defaultValue={s.footerDisclaimer} area />
        </section>

        <button className="rounded-md bg-maroon px-8 py-3 text-white">سب محفوظ کریں</button>
      </form>
    </div>
  );
}
