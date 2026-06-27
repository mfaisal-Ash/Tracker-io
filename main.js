/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []
// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date()


/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM

/**
 * TODO [Basic]:
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik)
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList
 */

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya
// TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array

/**
 * TODO [Skilled]:
 * Tambahkan validasi input sebelum menyimpan data:
 *  - Tampilkan alert() dan hentikan proses jika judul kosong
 *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1
 */

/**
 * TODO [Advanced]:
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor:
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML
 */


/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse().
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.
 */

/**
 * TODO [Skilled]:
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.
 */

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */


/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'
 *  - Simpan perubahan ke localStorage dan perbarui tampilan
 */

/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian:
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut
 */

/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi
 */

const STORAGE_KEY = 'tracker_transactions';
const TRANSACTION_UPDATED = 'transaction:update'

function getTransactions()
 {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
 }

 function saveTransactions(transactions){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
 }

 function formatRupiah(amount) {
    return 'RP' + Number(amount).toLocaleString('id-ID');
 }

 function createTransactionCard(transaction) {
    const {id, title, amount, date, type} = transaction;
    const isIncome = type === 'income';
    const typeLabel = isIncome ? 'Pemasukan' : 'Pengeluaran';
    const icon = isIncome ? '↑' : '↓';
    const iconClass = isIncome
    ? 'tracker-transaction-item__icon--income'
    : 'tracker-transaction-item__icon--expense';
    const amountClass = isIncome
    ? 'tracker-transaction-item__amount--income'
    : 'tracker-transaction-item__amount--expense';

    //tampilan Utama
    const item = document.createElement('div');
    item.setAttribute('data-testid', 'transactionItem');
    item.setAttribute('data-id', id);
    item.classList.add('tracker-transaction-item');

    const iconEl = document.createElement('div');
    iconEl.classList.add('tracker-transaction-item__icon', iconClass);
    iconEl.textContent = icon;

    const detail = document.createElement('div');
    detail.classList.add('tracker-transaction-item__detail');

    const titleEl = document.createElement('h3');
    titleEl.setAttribute('data-testid', 'transactionItemTitle');
    titleEl.classList.add('tracker-transaction-item__title');
    titleEl.textContent = title;

    const dateEl = document.createElement('p');
    dateEl.setAttribute('data-testid', 'transactionItemDate');
    dateEl.classList.add('tracker-transaction-item__date');
    dateEl.textContent = `Tanggal: ${date}`;

    const typeEl = document.createElement('p');
    typeEl.setAttribute('data-testid', 'transactionItemType');
    typeEl.classList.add('tracker-transaction-item__type');
    typeEl.textContent = `Tipe: ${typeLabel}`;

    detail.appendChild(titleEl);
    detail.appendChild(dateEl);
    detail.appendChild(typeEl);

    const right = document.createElement('div');
    right.classList.add('tracker-transaction-item__right');

    const amountEl = document.createElement('p');
    amountEl.setAttribute('data-testid', 'transactionItemAmount');
    amountEl.classList.add('tracker-transaction-item__amount', amountClass);
    amountEl.textContent = `Nominal: ${formatRupiah(amount)}`;

    const actions = document.createElement('div');
    actions.classList.add('tracker-transaction-item__actions');

    const btnChangeType = document.createElement('button');
    btnChangeType.setAttribute('data-testid', 'transactionItemEditTypeButton');
    btnChangeType.classList.add('tracker-transaction-item__btn', 'btn--change');
    btnChangeType.textContent = 'Ubah Tipe';
    btnChangeType.addEventListener('click', () => handleChangeType(id));

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('tracker-transaction-item__btn', 'btn--edit');
    btnEdit.textContent = 'Edit';
    btnEdit.addEventListener('click', () => handleEdit(id));

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('data-testid', 'transactionItemDeleteButton');
    btnDelete.classList.add('tracker-transaction-item__btn', 'btn--delete');
    btnDelete.textContent = 'Hapus';
    btnDelete.addEventListener('click', () => handleDelete(id));

    actions.appendChild(btnChangeType);
    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    right.appendChild(amountEl);
    right.appendChild(actions);

    item.appendChild(iconEl);
    item.appendChild(detail);
    item.appendChild(right);

    return item;
}

function renderAll(keyword = '') {
  const allTransactions = getTransactions();
  const incomeListEl  = document.getElementById('incomeList');
  const expenseListEl = document.getElementById('expenseList');

  incomeListEl.innerHTML  = '';
  expenseListEl.innerHTML = '';

  const filtered = keyword.trim()
    ? allTransactions.filter(t =>
        t.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : allTransactions;

  const incomes  = filtered.filter(t => t.type === 'income');
  const expenses = filtered.filter(t => t.type === 'expense');

  incomes.forEach(t => incomeListEl.appendChild(createTransactionCard(t)));

  expenses.forEach(t => expenseListEl.appendChild(createTransactionCard(t)));

  document.getElementById('incomeEmpty').style.display =
    incomes.length === 0 ? 'block' : 'none';
  document.getElementById('expenseEmpty').style.display =
    expenses.length === 0 ? 'block' : 'none';

  // Perbarui badge jumlah transaksi
  document.getElementById('incomeCount').textContent  = incomes.length;
  document.getElementById('expenseCount').textContent = expenses.length;

  updateDashboard(allTransactions);
}

function updateDashboard(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  document.getElementById('balanceAmount').textContent  = formatRupiah(balance);
  document.getElementById('incomeAmount').textContent   = formatRupiah(totalIncome);
  document.getElementById('expenseAmount').textContent  = formatRupiah(totalExpense);

  const balanceEl = document.getElementById('balanceAmount');
  balanceEl.style.color = balance < 0 ? 'var(--color-expense)' : '';
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title     = document.getElementById('transactionFormTitleInput').value.trim();
  const amountRaw = document.getElementById('transactionFormAmountInput').value;
  const date      = document.getElementById('transactionFormDateInput').value;
  const type      = document.getElementById('transactionFormTypeSelect').value;
  const editingId = document.getElementById('editingId').value;

  if (!title) {
    alert('Keterangan transaksi tidak boleh kosong!');
    return;
  }

  const amount = Number(amountRaw);
  if (!amountRaw || amount < 1) {
    alert('Nominal transaksi harus minimal Rp 1!');
    return;
  }

  if (!date) {
    alert('Tanggal transaksi tidak boleh kosong!');
    return;
  }

  let transactions = getTransactions();

  if (editingId) {
    transactions = transactions.map(t =>
      String(t.id) === editingId
        ? { ...t, title, amount, date, type }
        : t
    );
  } else {
    const newTransaction = {
      id:     +new Date(),
      title,
      amount,
      date,
      type
    };
    transactions.push(newTransaction);
  }
  saveTransactions(transactions);
  document.dispatchEvent(new Event(TRANSACTION_UPDATED));

  resetForm();
}

function handleDelete(id) {
  let transactions = getTransactions();
  transactions = transactions.filter(t => String(t.id) !== String(id));
  saveTransactions(transactions);
  document.dispatchEvent(new Event(TRANSACTION_UPDATED));
}


function handleChangeType(id) {
  let transactions = getTransactions();
  transactions = transactions.map(t => {
    if (String(t.id) === String(id)) {
      return { ...t, type: t.type === 'income' ? 'expense' : 'income' };
    }
    return t;
  });
  saveTransactions(transactions);
  document.dispatchEvent(new Event(TRANSACTION_UPDATED));
}

function handleEdit(id) {
  const transactions = getTransactions();
  const t = transactions.find(t => String(t.id) === String(id));
  if (!t) return;

  document.getElementById('editingId').value                   = t.id;
  document.getElementById('transactionFormTitleInput').value   = t.title;
  document.getElementById('transactionFormAmountInput').value  = t.amount;
  document.getElementById('transactionFormDateInput').value    = t.date;
  document.getElementById('transactionFormTypeSelect').value   = t.type;

  document.getElementById('submitBtn').textContent             = 'Perbarui';
  document.getElementById('cancelEditBtn').style.display       = 'inline-block';
  document.getElementById('form-heading').textContent          = 'Edit Transaksi';

  document.getElementById('transactionForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetForm() {
  document.getElementById('transactionForm').reset();
  document.getElementById('editingId').value             = '';
  document.getElementById('submitBtn').textContent       = 'Simpan';
  document.getElementById('cancelEditBtn').style.display = 'none';
  document.getElementById('form-heading').textContent    = 'Tambah Pencatatan Baru';

  // Kembalikan tanggal ke hari ini
  document.getElementById('transactionFormDateInput').value =
    new Date().toISOString().split('T')[0];
}

function init() {
  // Set tanggal hari ini sebagai default di form
  document.getElementById('transactionFormDateInput').value =
    new Date().toISOString().split('T')[0];


  const now = new Date();
  document.getElementById('currentDate').textContent =
    now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  document.addEventListener(TRANSACTION_UPDATED, () => {
    const keyword = document.getElementById('searchTransactionFormTitleInput').value;
    renderAll(keyword);
  });

  document.getElementById('transactionForm')
    .addEventListener('submit', handleFormSubmit);

  document.getElementById('cancelEditBtn')
    .addEventListener('click', resetForm);

  document.getElementById('searchTransactionFormTitleInput')
    .addEventListener('input', (e) => {
      renderAll(e.target.value);
    });

  document.getElementById('searchTransactionForm')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = document.getElementById('searchTransactionFormTitleInput').value;
      renderAll(keyword);
    });


  document.dispatchEvent(new Event(TRANSACTION_UPDATED));
}

document.addEventListener('DOMContentLoaded', init);

 