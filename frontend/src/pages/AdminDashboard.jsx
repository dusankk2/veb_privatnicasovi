import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PrivateRoute from '../../components/auth/PrivateRoute';
import Message from '../../components/common/Message';
import './Admin.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('subjects');
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Matematika', category: 'STEM', level: 'Srednji' },
    { id: 2, name: 'Engleski', category: 'Jezici', level: 'Napredni' },
  ]);
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Prof. Marko', subject: 'Matematika', rating: 4.8 },
    { id: 2, name: 'Jelena Jovanovic', subject: 'Engleski', rating: 4.9 },
  ]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      student: 'Petar Petrovic',
      teacher: 'Prof. Marko',
      subject: 'Matematika',
      date: '2026-05-30',
      time: '10:00',
      status: 'confirmed',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [newItem, setNewItem] = useState({});

  const handleAddItem = (type) => {
    formType === type && showForm ? setShowForm(false) : (setFormType(type), setShowForm(true));
  };

  const handleSubmitForm = () => {
    if (formType === 'subject') {
      setSubjects([...subjects, { ...newItem, id: subjects.length + 1 }]);
    } else if (formType === 'teacher') {
      setTeachers([...teachers, { ...newItem, id: teachers.length + 1 }]);
    }
    setNewItem({});
    setShowForm(false);
  };

  const handleDeleteItem = (type, id) => {
    if (type === 'subject') setSubjects(subjects.filter((s) => s.id !== id));
    else if (type === 'teacher') setTeachers(teachers.filter((t) => t.id !== id));
    else if (type === 'appointment') setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <PrivateRoute
      requiredRole="admin"
      element={
        <div className="admin-dashboard">
          <div className="admin-header">
            <h1>📑 Admin Panel</h1>
            <p>Dobro došli, {user?.name}! Upravljaj sistemom ovde.</p>
          </div>

          <div className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              Predmeti
            </button>
            <button
              className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              Predavači
            </button>
            <button
              className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              Termini
            </button>
          </div>

          <div className="admin-content">
            {/* Subjects Tab */}
            {activeTab === 'subjects' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2>Upravljanje Predmetima</h2>
                  <button
                    className="btn-add"
                    onClick={() => handleAddItem('subject')}
                  >
                    + Dodaj Predmet
                  </button>
                </div>

                {showForm && formType === 'subject' && (
                  <div className="form-section">
                    <h3>Dodaj Novi Predmet</h3>
                    <input
                      type="text"
                      placeholder="Naziv Predmeta"
                      value={newItem.name || ''}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Kategorija"
                      value={newItem.category || ''}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Nivo"
                      value={newItem.level || ''}
                      onChange={(e) => setNewItem({ ...newItem, level: e.target.value })}
                    />
                    <button onClick={handleSubmitForm} className="btn-save">Sačuvaj</button>
                    <button onClick={() => setShowForm(false)} className="btn-cancel">Otkaži</button>
                  </div>
                )}

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Naziv</th>
                      <th>Kategorija</th>
                      <th>Nivo</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id}>
                        <td>{subject.name}</td>
                        <td>{subject.category}</td>
                        <td>{subject.level}</td>
                        <td>
                          <button className="btn-edit">Uredi</button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteItem('subject', subject.id)}
                          >
                            Obriši
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Teachers Tab */}
            {activeTab === 'teachers' && (
              <div className="tab-content">
                <div className="content-header">
                  <h2>Upravljanje Predavačima</h2>
                  <button
                    className="btn-add"
                    onClick={() => handleAddItem('teacher')}
                  >
                    + Dodaj Predavača
                  </button>
                </div>

                {showForm && formType === 'teacher' && (
                  <div className="form-section">
                    <h3>Dodaj Novog Predavača</h3>
                    <input
                      type="text"
                      placeholder="Ime i Prezime"
                      value={newItem.name || ''}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Predmet"
                      value={newItem.subject || ''}
                      onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
                    />
                    <button onClick={handleSubmitForm} className="btn-save">Sačuvaj</button>
                    <button onClick={() => setShowForm(false)} className="btn-cancel">Otkaži</button>
                  </div>
                )}

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ime</th>
                      <th>Predmet</th>
                      <th>Rejting</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.subject}</td>
                        <td>★ {teacher.rating}/5</td>
                        <td>
                          <button className="btn-edit">Uredi</button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteItem('teacher', teacher.id)}
                          >
                            Obriši
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="tab-content">
                <h2>Pregled Zakazanih Termina</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Učenik</th>
                      <th>Predavač</th>
                      <th>Predmet</th>
                      <th>Datum</th>
                      <th>Vreme</th>
                      <th>Status</th>
                      <th>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt) => (
                      <tr key={appt.id}>
                        <td>{appt.student}</td>
                        <td>{appt.teacher}</td>
                        <td>{appt.subject}</td>
                        <td>{appt.date}</td>
                        <td>{appt.time}</td>
                        <td>
                          <span className={`status-badge status-${appt.status}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteItem('appointment', appt.id)}
                          >
                            Otkaži
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default AdminDashboard;