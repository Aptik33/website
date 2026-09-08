# Ölçüm yapılacaklar

Sitedeki uydurma sayılar temizlendi. Bu dosya, **gerçek ölçümü yaptığında nereye
ne yazacağını** gösteriyor.

Kural basit: **ölçmeden sayı yazma.** Ölçemediğin şeyi "izlenim" diye etiketle.

---

## 1. Ay sonu kontrolü ne kadar sürüyordu?

**Neden önemli:** Aracın tek somut faydası bu ve şu an sitede yazmıyor.

**Nasıl ölç:**
1. Bir sonraki ay sonunda, bordro çıktıktan sonra telefonun kronometresini başlat
2. Puantaj–bordro karşılaştırmasını **elle** yaptığın gibi yap
3. Süreyi ve kaç kişi olduğunu not et
4. Sonra aynı veriyi `kontrol.py` ile geçir, o süreyi de not et

**Nereye yaz:**

`src/content/projeler/puantaj-bordro-capraz-kontrol.mdx` → `metrikler` bölümüne ekle:

```yaml
  - etiket: "Ay sonu kontrolü"
    deger: "45 dk → 2 dk"        # ← kendi ölçtüğün değer
```

Ve aynı dosyada "Kazandırdığı süreyi henüz ölçmedim" paragrafını gerçek sayıyla değiştir.

Aynısı: `src/content/yazilar/excel-birakmadan-kontrolu-pythona-devretmek.mdx`
→ "Ne kazandırdı, ne kazandırmadı" bölümü.

---

## 2. Kaç kişilik bordro işliyorsun?

**Nasıl ölç:** Bir aylık puantaj dosyasındaki satır sayısı.

**Nereye yaz:** Aynı projenin `metrikler` bölümü:

```yaml
  - etiket: "İşlenen personel"
    deger: "64 kişi"             # ← gerçek sayı
```

---

## 3. Yerel LLM ölçümleri

**Neden önemli:** `yerel-llm-vram-hiz-kalite-takasi` yazısının tablosu şu an **boş**.
Yazı zaten "ölçüm bekliyor" diyor, yani dürüst — ama boş tablo da bir borç.

**Nasıl ölç:**

```bash
# 1. Modeli indir
ollama pull llama3.1:8b

# 2. Token hızı — Ollama sonunda kendisi yazar
ollama run llama3.1:8b --verbose "Kısa bir özet yaz: ..."

# 3. VRAM — model çalışırken ayrı bir pencerede
nvidia-smi

# 4. Format tutarlılığı — aynı JSON promptunu 10 kez çalıştır,
#    kaçında json.loads() hata vermeden geçti say
```

Tablodaki 5 kurulum için tekrarla:
`8B·Q4·4k`, `8B·Q4·16k`, `8B·Q8·4k`, `7B·Q4·4k`, `3B·Q4·4k`

**Nereye yaz:** `src/content/yazilar/yerel-llm-vram-hiz-kalite-takasi.mdx`
→ "Sonuçlar" tablosundaki `—` işaretlerinin yerine.

Sonra:
- "**Ölçüm bekliyor.**" satırını sil
- Girişteki `> Bu yazı henüz sonuç içermiyor` kutusunu sil
- "Test edeceğim üç varsayım" → "Ölçümden çıkan üç sonuç" yap, hangisi doğru
  çıktı hangisi çıkmadı yaz
- `guncellemeTarihi` alanını o günün tarihiyle değiştir

> **Varsayımın yanlış çıkarsa onu yaz.** "Beklediğim gibi olmadı" cümlesi,
> tutan bir tahminden daha değerli — çünkü kimse onu uyduramaz.

---

## 4. Falcı uygulaması: analiz süresi ve JSON oranı

**Nasıl ölç:** Uygulamayı tekrar çalıştırdığında 10 görüntü geçir, süreleri not et,
kaçında şema doğrulaması ilk denemede geçti say.

**Nereye yaz:** `src/content/projeler/offline-gorsel-analiz-uygulamasi.mdx`
→ `metrikler` bölümüne ekle, "Süre ve başarı oranı ölçülmedi" paragrafını değiştir.

---

## Şu an sitede duran gerçek sayılar

Bunlar ölçüldü, dokunma:

| sayı | nerede | nasıl doğrulanır |
|---|---|---|
| 9 kontrol kuralı | Puantaj projesi | `kontrol.py` içinde E01–E09 sayılabilir |
| 0,13 sn (200 personel) | Puantaj projesi | 7 kez çalıştırılıp medyanı alındı |
| 0 harici bağımlılık | Puantaj projesi | scriptte sadece stdlib import var |
| 0 bayt dışarı veri | Falcı projesi | mimari gereği, sadece localhost |
| SHA-256 özetleri | Kaynak sayfaları | dosyadan hesaplanabilir |

---

## Hatırlatma

Sitenin tek iddiası şu: *"ölçüm yazarım, iddia değil."*

Bu iddiayı taşıyan tek şey, buradaki sayıların gerçekten ölçülmüş olması. Bir tanesi
uydurma çıkarsa okuyucu diğerlerine de inanmaz — ve haklı olur.
