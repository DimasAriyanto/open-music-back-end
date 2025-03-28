# Open Music API

Proyek ini adalah implementasi RESTful API untuk mengelola data musik. API ini dirancang sebagai bagian dari tugas akhir pada kelas **Belajar Fundamental Aplikasi Back-End** di Dicoding.

## Fitur Utama
- **Manajemen Lagu dan Album**
  - Tambah, ubah, hapus, dan ambil data lagu serta album.
- **Manajemen Playlist**
  - Buat dan kelola playlist pengguna.
- **Autentikasi dan Otorisasi**
  - Menggunakan JSON Web Token (JWT) untuk autentikasi.
- **Ekspor Data Playlist**
  - Menggunakan RabbitMQ untuk mengekspor data playlist melalui email.
- **Cache Data**
  - Menggunakan Redis untuk mempercepat pengambilan data.

## Teknologi yang Digunakan
- **Node.js** + **Hapi.js**
- **PostgreSQL** (Database)
- **JWT** (JSON Web Token)
- **RabbitMQ** (Message Broker)
- **Redis** (Cache Data)
- **Joi** (Validasi Data)

## Instalasi
1. Instal dependensi
```bash
npm install
```

2. Konfigurasi environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Lalu sesuaikan nilai variabel di dalamnya.

3. Jalankan migrasi database
```bash
npm run migrate
```

4. Jalankan server
```bash
npm start
```

## Endpoint API

### Lagu (Songs)
| Method | Endpoint             | Deskripsi                    |
|---------|----------------------|------------------------------|
| `POST`   | `/songs`              | Tambah lagu baru             |
| `GET`    | `/songs`              | Ambil daftar lagu            |
| `GET`    | `/songs/{songId}`     | Ambil detail lagu            |
| `PUT`    | `/songs/{songId}`     | Ubah data lagu               |
| `DELETE` | `/songs/{songId}`     | Hapus lagu                   |

### Album
| Method | Endpoint              | Deskripsi                    |
|---------|-----------------------|------------------------------|
| `POST`   | `/albums`              | Tambah album baru            |
| `GET`    | `/albums`              | Ambil daftar album           |
| `GET`    | `/albums/{albumId}`    | Ambil detail album           |
| `PUT`    | `/albums/{albumId}`    | Ubah data album              |
| `DELETE` | `/albums/{albumId}`    | Hapus album                  |

### Playlist
| Method | Endpoint                     | Deskripsi                        |
|---------|------------------------------|----------------------------------|
| `POST`   | `/playlists`                 | Buat playlist baru                |
| `GET`    | `/playlists`                 | Ambil daftar playlist             |
| `POST`   | `/playlists/{playlistId}/songs` | Tambah lagu ke dalam playlist     |
| `GET`    | `/playlists/{playlistId}/songs` | Ambil daftar lagu dalam playlist  |
| `DELETE` | `/playlists/{playlistId}/songs` | Hapus lagu dari playlist          |

### Users
| Method | Endpoint             | Deskripsi                    |
|---------|----------------------|------------------------------|
| `POST`   | `/users`              | Tambah pengguna baru         |
| `GET`    | `/users/{userId}`     | Ambil detail pengguna        |

### Export
| Method | Endpoint             | Deskripsi                    |
|---------|----------------------|------------------------------|
| `POST`   | `/export/playlists/{playlistId}` | Ekspor data playlist ke email |

### Collaboration
| Method | Endpoint                     | Deskripsi                        |
|---------|------------------------------|----------------------------------|
| `POST`   | `/collaborations`            | Tambah kolaborator ke playlist   |
| `DELETE` | `/collaborations`            | Hapus kolaborator dari playlist  |

## Testing
Jalankan perintah berikut untuk menjalankan pengujian otomatis:
```bash
npm test
```
