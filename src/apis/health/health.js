class Health {
  constructor() {
    this.health = "Application is Healthy";
  }

  getHealth(req, res) {
    res.send({
      health: this.health,
      status: 200,
    });
  }
}

module.exports = Health;
