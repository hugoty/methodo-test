class SessionPort {
    constructor(heure_debut, heure_fin, pauses = [], _id = null) {
      if (_id) {
        this._id = _id;
      }
      this.heure_debut = heure_debut;
      this.heure_fin = heure_fin;
      this.pauses = pauses;
    }
  
    toJSON() {
      return {
        id: this._id,
        heure_debut: this.heure_debut,
        heure_fin: this.heure_fin,
        pauses: this.pauses.map(pause => pause.toJSON())
      };
    }
  
    static fromDocument(doc) {
      const pauses = doc.pauses.map(pause => Pause.fromDocument(pause));
      return new SessionPort(doc.heure_debut, doc.heure_fin, pauses, doc._id);
    }
  }
  
  export default SessionPort;
  