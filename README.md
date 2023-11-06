# Word-Tracker


Bu projenin amacı özellikle de yabancı dil öğrenen insanların yeni kelimeleri ezberleyebilmesini kolaylaştırmaktır. Mantığı ise şu şekilde diyebiliriz: bir dil öğrenirken karşımıza o dil ile ilgili öğrenilecek birçok kelime çıkar fakat bizim için önemli olan temel bazı kelimeler vardır ve bu kelimeler herkesin dil öğrenim amacına göre değişebilir. Biz burada bu yazılımı dil öğrenirken karşımıza çıkan yeni kelimeleri kaydederek kullanıyoruz bir kelimeyi gördüğümüzde eğer bilmiyorsak bu kelimeyi addWord komutu ile (aşağıda göreceksiniz komutları) kaydetmemiz gerekiyor. Biz bir kelimeyi bir defa kaydettiğimizde o kelimenin puanı 1 olur, bu kelime tekrar karşımıza çıktığında yine kaydedersek puanı 2 olacaktır bu şekilde puanlama sıralaması ile kelimelerin ne sıklıkta karşımıza çıktığını anlayacağız ve ezberleme önceliğimizi belirlemek çok daha kolaylaşacaktır. 

### Kurulum

1. Projeyi bilgisayarınıza klonlayın veya indirin.

2. Node.js ve MySQL yüklü olmalıdır.

3. MySQL veritabanınızı oluşturun ve tabloyu aşağıdaki açıklamalara göre hazırlayın.

### MySQL Veritabanı Yapısı

Bu projede kullanılacak veritabanının tablosunu oluşturmak için aşağıdaki SQL komutunu kullanabilirsiniz:

```sql
CREATE TABLE words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  count INT NOT NULL
);
```

Bu SQL komutu, "words" adında bir tablo oluşturur. Bu tablo, üç sütundan oluşur:
- "id": Kelimenin benzersiz bir kimliğini temsil eden bir tamsayı.
- "word": Kelimeyi temsil eden bir dize (string).
- "count": Kelimenin kaç kez kullanıldığını izleyen bir tamsayı.

### Kullanım

1. Proje dizininde terminale gidin ve aşağıdaki komutu çalıştırarak uygulamayı başlatın:

   ```bash
   node app.js
   ```

2. Uygulama başladığında, kullanıcılar aşağıdaki komutları kullanarak işlemler yapabilirler:

   - `addWord [kelime]`: Yeni bir kelime ekler ve sayısını artırır.
   - `listWords`: Veritabanındaki kelimeleri ve sayılarını listeler.
   - `updateWord [eski kelime] [yeni kelime]`: Bir kelimenin adını günceller.
   - `deleteWord [kelime]`: Bir kelimeyi veritabanından siler.
   - `learn [kelime]`: İnternet üzerindeki bir sözlük hizmetini kullanarak bir kelimenin tanımını ve örnek cümlesini öğrenir.

### Komut Listesi

Aşağıdaki komutları kullanabilirsiniz:

1. `addWord [kelime]`: Yeni bir kelime ekler.
2. `listWords`: Veritabanındaki kelimeleri listeler.
3. `updateWord [eski kelime] [yeni kelime]`: Bir kelimenin adını günceller.
4. `deleteWord [kelime]`: Bir kelimeyi siler.
5. `learn [kelime]`: Bir kelimenin tanımını ve örnek cümlesini öğrenir.

### Örnekler

Bu proje konsol ekranında çalıştırılabilir onun dışında herhangi bir arayüzü yoktur.
Uygulama başladığında komutları kullanabilirsiniz:

- Yeni bir kelime eklemek için:
  ```bash
  addWord apple
  ```

- Kelimeleri listelemek için:
  ```bash
  listWords
  ```

- Bir kelimenin adını güncellemek için:
  ```bash
  updateWord apple banana
  ```

- Bir kelimeyi silmek için:
  ```bash
  deleteWord banana
  ```

- Bir kelimenin tanımını ve örnek cümlesini öğrenmek için:
  ```bash
  learn apple
  ```

### Notlar

- Projenin düzgün çalışabilmesi için MySQL veritabanı bağlantı bilgilerinizi güncellemeyi unutmayın.
