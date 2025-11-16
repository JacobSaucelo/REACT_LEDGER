import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default function LedgerApp() {
  const [entries, setEntries] = useState([
    {
      id: generateUUID(),
      title: 'Initial Deposit',
      description: 'Opening balance',
      amount: 5000,
      currency: 'USD',
      category: 'Savings',
      type: 'Income',
      account_from: '',
      account_to: 'Main Account',
      date: '2024-01-01',
      date_created: new Date('2024-01-01').toISOString(),
      date_updated: new Date('2024-01-01').toISOString(),
      created_by: 'user_001',
      updated_by: 'user_001',
      tags: ['initial', 'savings'],
      notes: 'Initial account setup',
      attachments: [],
      status: 'Active'
    },
    {
      id: generateUUID(),
      title: 'Salary',
      description: 'Monthly salary',
      amount: 3500,
      currency: 'USD',
      category: 'Income',
      type: 'Income',
      account_from: 'Employer',
      account_to: 'Main Account',
      date: '2024-01-15',
      date_created: new Date('2024-01-15').toISOString(),
      date_updated: new Date('2024-01-15').toISOString(),
      created_by: 'user_001',
      updated_by: 'user_001',
      tags: ['salary', 'income'],
      notes: '',
      attachments: [],
      status: 'Active'
    },
    {
      id: generateUUID(),
      title: 'Rent Payment',
      description: 'Monthly rent',
      amount: 1200,
      currency: 'USD',
      category: 'Housing',
      type: 'Expense',
      account_from: 'Main Account',
      account_to: 'Landlord',
      date: '2024-01-05',
      date_created: new Date('2024-01-05').toISOString(),
      date_updated: new Date('2024-01-05').toISOString(),
      created_by: 'user_001',
      updated_by: 'user_001',
      tags: ['rent', 'housing'],
      notes: '',
      attachments: [],
      status: 'Active'
    },
    {
      id: generateUUID(),
      title: 'Groceries',
      description: 'Weekly groceries',
      amount: 350,
      currency: 'USD',
      category: 'Food',
      type: 'Expense',
      account_from: 'Main Account',
      account_to: 'Supermarket',
      date: '2024-01-10',
      date_created: new Date('2024-01-10').toISOString(),
      date_updated: new Date('2024-01-10').toISOString(),
      created_by: 'user_001',
      updated_by: 'user_001',
      tags: ['food', 'groceries'],
      notes: '',
      attachments: [],
      status: 'Active'
    },
    {
      id: generateUUID(),
      title: 'Utilities',
      description: 'Electric and water',
      amount: 180,
      currency: 'USD',
      category: 'Bills',
      type: 'Expense',
      account_from: 'Main Account',
      account_to: 'Utility Company',
      date: '2024-01-12',
      date_created: new Date('2024-01-12').toISOString(),
      date_updated: new Date('2024-01-12').toISOString(),
      created_by: 'user_001',
      updated_by: 'user_001',
      tags: ['bills', 'utilities'],
      notes: '',
      attachments: [],
      status: 'Active'
    }
  ]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'USD',
    category: '',
    type: 'Income',
    account_from: '',
    account_to: '',
    date: '',
    tags: '',
    notes: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [statusFilter, setStatusFilter] = useState('Active');

  const openModal = (mode, entry = null) => {
    setModalMode(mode);
    if (entry) {
      setForm({
        title: entry.title,
        description: entry.description,
        amount: entry.amount,
        currency: entry.currency,
        category: entry.category,
        type: entry.type,
        account_from: entry.account_from,
        account_to: entry.account_to,
        date: entry.date,
        tags: entry.tags.join(', '),
        notes: entry.notes
      });
      setEditId(entry.id);
    } else {
      setForm({
        title: '',
        description: '',
        amount: '',
        currency: 'USD',
        category: '',
        type: 'Income',
        account_from: '',
        account_to: '',
        date: '',
        tags: '',
        notes: ''
      });
      setEditId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({
      title: '',
      description: '',
      amount: '',
      currency: 'USD',
      category: '',
      type: 'Income',
      account_from: '',
      account_to: '',
      date: '',
      tags: '',
      notes: ''
    });
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.date) return;

    const timestamp = new Date().toISOString();
    const tagsArray = form.tags ? form.tags.split(',').map(t => t.trim()) : [];

    if (editId) {
      setEntries(entries.map(entry =>
        entry.id === editId ? {
          ...entry,
          ...form,
          amount: parseFloat(form.amount),
          tags: tagsArray,
          date_updated: timestamp,
          updated_by: 'user_001'
        } : entry
      ));
    } else {
      setEntries([...entries, {
        id: generateUUID(),
        ...form,
        amount: parseFloat(form.amount),
        tags: tagsArray,
        date_created: timestamp,
        date_updated: timestamp,
        created_by: 'user_001',
        updated_by: 'user_001',
        attachments: [],
        status: 'Active'
      }]);
    }
    closeModal();
  };

  const handleArchive = (id) => {
    setEntries(entries.map(entry =>
      entry.id === id ? {
        ...entry,
        status: 'Archived',
        date_updated: new Date().toISOString(),
        updated_by: 'user_001'
      } : entry
    ));
    setDeleteConfirm(null);
  };

  const handleRestore = (id) => {
    setEntries(entries.map(entry =>
      entry.id === id ? {
        ...entry,
        status: 'Active',
        date_updated: new Date().toISOString(),
        updated_by: 'user_001'
      } : entry
    ));
  };

  const downloadCSV = () => {
    const filteredEntries = statusFilter === 'All' ? entries : entries.filter(e => e.status === statusFilter);
    const headers = ['ID', 'Title', 'Description', 'Amount', 'Currency', 'Category', 'Type', 'Account From', 'Account To', 'Date', 'Status', 'Tags', 'Notes'];
    const rows = filteredEntries.map(e => [
      e.id,
      e.title,
      e.description,
      e.amount,
      e.currency,
      e.category,
      e.type,
      e.account_from,
      e.account_to,
      e.date,
      e.status,
      e.tags.join(';'),
      e.notes
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledger.csv';
    a.click();
  };

  const downloadJSON = () => {
    const filteredEntries = statusFilter === 'All' ? entries : entries.filter(e => e.status === statusFilter);
    const json = JSON.stringify(filteredEntries, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledger.json';
    a.click();
  };

  const activeEntries = entries.filter(e => e.status === 'Active');
  const displayEntries = statusFilter === 'All' ? entries : entries.filter(e => e.status === statusFilter);

  const totalIncome = activeEntries.filter(e => e.type === 'Income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = activeEntries.filter(e => e.type === 'Expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const percentChange = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  const categoryData = activeEntries.reduce((acc, entry) => {
    if (entry.type === 'Expense') {
      const cat = entry.category || 'Other';
      acc[cat] = (acc[cat] || 0) + entry.amount;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const timelineData = activeEntries
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, entry) => {
      const existing = acc.find(item => item.date === entry.date);
      if (existing) {
        if (entry.type === 'Income') existing.income += entry.amount;
        if (entry.type === 'Expense') existing.expense += entry.amount;
      } else {
        acc.push({
          date: entry.date,
          income: entry.type === 'Income' ? entry.amount : 0,
          expense: entry.type === 'Expense' ? entry.amount : 0
        });
      }
      return acc;
    }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Ledger Dashboard</h1>
        <button 
          onClick={() => openModal('create')}
          style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
        >
          + New Entry
        </button>
      </div>

      {/* Dashboard Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Balance</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: balance >= 0 ? '#10b981' : '#ef4444' }}>
            ${balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: balance >= 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
            {balance >= 0 ? '↑' : '↓'} {percentChange}%
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Income</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
            ${totalIncome.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {activeEntries.filter(e => e.type === 'Income').length} transactions
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Expenses</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>
            ${totalExpense.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {activeEntries.filter(e => e.type === 'Expense').length} transactions
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Net Change</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: balance >= 0 ? '#10b981' : '#ef4444' }}>
            {balance >= 0 ? '+' : ''}{balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {balance >= 0 ? 'You\'re up!' : 'You\'re down'}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Income vs Expenses Over Time</h3>
          <LineChart width={700} height={250} data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Expenses by Category</h3>
          <PieChart width={300} height={250}>
            <Pie data={pieData} cx={150} cy={125} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Filter and Export */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <label style={{ marginRight: '10px', fontWeight: '600' }}>Filter by Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option>Active</option>
            <option>Archived</option>
            <option>All</option>
          </select>
        </div>
        <div>
          <button onClick={downloadCSV} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Download CSV
          </button>
          <button onClick={downloadJSON} style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Download JSON
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>All Transactions ({displayEntries.length})</h3>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th colSpan="12" style={{ textAlign: 'center', padding: '12px' }}>Ledger Entries</th>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Category</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayEntries.map((entry) => (
              <tr key={entry.id} style={{ opacity: entry.status === 'Archived' ? 0.6 : 1 }}>
                <td>{entry.title}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: entry.type === 'Income' ? '#d1fae5' : entry.type === 'Expense' ? '#fee2e2' : '#dbeafe',
                    color: entry.type === 'Income' ? '#065f46' : entry.type === 'Expense' ? '#991b1b' : '#1e40af'
                  }}>
                    {entry.type}
                  </span>
                </td>
                <td style={{
                  color: entry.type === 'Income' ? '#10b981' : entry.type === 'Expense' ? '#ef4444' : '#3b82f6',
                  textAlign: 'right',
                  fontWeight: 'bold'
                }}>
                  {entry.amount.toFixed(2)}
                </td>
                <td>{entry.currency}</td>
                <td>{entry.category}</td>
                <td>{entry.account_from}</td>
                <td>{entry.account_to}</td>
                <td>{entry.date}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: entry.status === 'Active' ? '#d1fae5' : '#f3f4f6',
                    color: entry.status === 'Active' ? '#065f46' : '#6b7280'
                  }}>
                    {entry.status}
                  </span>
                </td>
                <td style={{ fontSize: '12px' }}>{entry.tags.join(', ')}</td>
                <td style={{ fontSize: '12px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.notes}</td>
                <td>
                  {entry.status === 'Active' ? (
                    <>
                      <button onClick={() => openModal('edit', entry)} style={{ marginRight: '5px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => setDeleteConfirm(entry.id)} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}>Archive</button>
                    </>
                  ) : (
                    <button onClick={() => handleRestore(entry.id)} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer', backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }}>Restore</button>
                  )}
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
              <td colSpan="2" style={{ textAlign: 'right' }}>Total Balance (Active):</td>
              <td style={{ color: balance >= 0 ? '#10b981' : '#ef4444', textAlign: 'right' }}>
                {balance.toFixed(2)}
              </td>
              <td colSpan="9"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>{modalMode === 'create' ? 'Create New Entry' : 'Edit Entry'}</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Amount *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Currency</label>
                <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option>Income</option>
                  <option>Expense</option>
                  <option>Transfer</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Account From</label>
                <input
                  type="text"
                  value={form.account_from}
                  onChange={(e) => setForm({ ...form, account_from: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Account To</label>
                <input
                  type="text"
                  value={form.account_to}
                  onChange={(e) => setForm({ ...form, account_to: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Notes</label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {modalMode === 'create' ? 'Create Entry' : 'Update Entry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h2 style={{ marginTop: 0, color: '#991b1b' }}>Archive Entry?</h2>
            <p style={{ marginBottom: '20px' }}>Are you sure you want to archive this entry? It will be moved to archived status and won't affect your balance calculations.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 20px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => handleArchive(deleteConfirm)} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Archive Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}