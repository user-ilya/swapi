class SwapiService {
  _urlBase = 'https://swapi.dev/api'
  _urlImageBase = 'https://starwars-visualguide.com/assets/img'
  async getRequest (url) {
  const res = await fetch(`${this._urlBase}${url}`)
    if(!res.ok) {
      throw new Error('Error res, ' + res.status)
    }
  const body = await res.json()
  return body
  }

  getPeople = async (id) => {
    const res = await this.getRequest(`/people/${id}`)
    return await this._transformPeople(res)
  }

  getAllPeople = async () => {
    const res = await this.getRequest(`/people`)
    return await res.results.map(this._transformPeople)
  }
  
  getStarship = async (id) => {
    const res = await this.getRequest(`/starships/${id}`)
    return await this._transformSpaceship(res)
  }

  getAllStarships = async () => {
    const res = await this.getRequest(`/starships`)
    return await res.results.map(this._transformSpaceship)
  }
  getPlanet = async (id) => {
    const res = await this.getRequest(`/planets/${id}`)
    return await this._transformPlanet(res)
  }

  getAllPlanets = async () => {
    const res = await this.getRequest(`/planets`)
    return await res.results.map(this._transformPlanet)
  }
  getId = (index) => {
    const idRex = /\/([0-9]*)\/$/; /// regex101.com
    const id = index.url.match(idRex)[1] // указание группы в скобках
    return id
  }
  getPersonImage = ({id}) => {
    return `${this._urlImageBase}/characters/${id}.jpg`
  }
  getStarshipImage = ({id}) => {
    return `${this._urlImageBase}/starships/${id}.jpg`
  }
  getPlanetImage = ({id}) => {
    return `${this._urlImageBase}/planets/${id}.jpg`
  }
   _transformPlanet = (planet) => {
    return  {
      id: this.getId(planet),
      name: planet.name,
      population: planet.population,
      diameter: planet.diameter,
      period: planet.orbital_period
    }
  }
  _transformPeople = (people) => {
    return {
      id: this.getId(people),
      name: people.name,
      gender: people.gender,
      mass: people.mass,
      height: people.height,
      age: people.birth_year
    }
  }
  _transformSpaceship = (spaceship) => {
    return {
      id: this.getId(spaceship),
      name: spaceship.name,
      passengers: spaceship.passengers,
      model: spaceship.model,
      length: spaceship.length,
      crew: spaceship.crew,
      created: spaceship.created
    }
  }
}
  
/*   const swapi = new SwapiService()
  swapi.getPeople(5).then((body) => {console.log(body)})
  swapi.getAllPlanets().then((planets) => {
    planets.forEach(planet => {
        return console.log(planet.name)
    });
  })
  swapi.getStarship(12).then((starship)=> {
    console.log(starship)
  })
 */
export default SwapiService