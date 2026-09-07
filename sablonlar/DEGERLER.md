# Şablonlarda kullanılabilecek değerler

Bu alanlara **sadece** aşağıdaki kelimeler yazılabilir. Başka bir şey
yazarsan site yayınlanmaz (ama eski hali çalışmaya devam eder, bir şey bozulmaz).

## kategori — dördünden biri

| yaz | sitede görünen | renk |
|---|---|---|
| `ai` | Yapay Zekâ | mor |
| `otomasyon` | Otomasyon | turuncu |
| `muhasebe` | Muhasebe & Excel | yeşil |
| `donanim` | Donanım & Oyun | mavi |

## durum — sadece projelerde, üçünden biri

| yaz | sitede görünen |
|---|---|
| `aktif` | Geliştiriliyor |
| `tamamlandi` | Tamamlandı |
| `arsiv` | Arşiv |

## taslak — sadece yazılarda

| yaz | ne olur |
|---|---|
| `false` | Yayınlanır, herkes görür |
| `true` | Yayınlanmaz, sadece sen görürsün |

Bitmemiş bir yazıyı `taslak: true` ile kaydedebilirsin. Hazır olunca
`false` yapıp tekrar kaydedersin.

## Tarih biçimi

Her zaman `YIL-AY-GÜN` şeklinde, tırnak yok:

```
yayinTarihi: 2026-09-15
```

15 Eylül 2026 demek. Ay ve gün tek haneliyse başına sıfır koy: `2026-03-05`

## etiketler

Köşeli parantez içinde, tırnaklı, virgülle ayrılmış. En az 1, en fazla 6:

```
etiketler: ["Python", "Excel", "Bordro"]
```

Her etiket için sitede otomatik bir arşiv sayfası oluşur.

## Dosya adı = internet adresi

`excel-otomasyonu.mdx` adlı dosya → `siten.com/blog/excel-otomasyonu`

Kurallar:
- Sadece küçük harf
- Türkçe karakter YOK (ş→s, ı→i, ğ→g, ç→c, ö→o, ü→u)
- Boşluk yerine tire
- Sonu `.mdx`

Doğru: `santiyede-excel-otomasyonu.mdx`
Yanlış: `Şantiyede Excel Otomasyonu.mdx`
