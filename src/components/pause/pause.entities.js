class Pause {
    constructor(heure_debut, heure_fin, _id = null) {
      if (_id) {
        this._id = _id;
      }
      this.heure_debut = heure_debut;
      this.heure_fin = heure_fin;
    }
  
    toJSON() {
      return {
        id: this._id,
        heure_debut: this.heure_debut,
        heure_fin: this.heure_fin
      };
    }
  
    static fromDocument(doc) {
      return new Pause(doc.heure_debut, doc.heure_fin, doc._id);
    }
  }
  
  export default Pause;
  