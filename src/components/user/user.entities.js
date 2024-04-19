class User {
  constructor(email, nom, sessions = [], _id = null) {
    if (_id) {
      this._id = _id;
    }
    this.email = email;
    this.nom = nom;
    this.sessions = sessions;
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
      nom: this.nom,
      sessions: this.sessions.map(session => session.toJSON())
    };
  }

  static fromDocument(doc) {
    const sessions = doc.sessions.map(session => SessionPort.fromDocument(session));
    return new User(doc.email, doc.nom, sessions, doc._id);
  }
}

export default User;
