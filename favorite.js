const favorite = {
  controlFavorite(id) {
    let favorite = this.getFavorite(),
      check = this.checkFavorite(favorite, id),
      update;

    this.switchClassFavorite(id);

    update = (check === true) ? this.removeFavorite(favorite, id) : this.addFavorite(favorite, id);
    this.setFavorite(update);
  },

  getFavorite() {
    return localStorage.getItem('favorite') ? localStorage.getItem('favorite').split(',') : []
  },

  setFavorite(array) {
    localStorage.setItem('favorite', array)
  },

  checkFavorite(array, id) {
    return array.includes(id);
  },

  addFavorite(array, id) {
    return array.concat(id);
  },

  removeFavorite(array, id) {
    return array.filter(item => item !== id);
  },

  switchClassFavorite(id) {
    let favoriteItem = document.querySelectorAll(`[data-favorite="${ id }"]`);

    for (let item of favoriteItem) {
      item.classList.toggle('active');
    }
  },

  setActiveElementsFavorite(favorites) {
    if (!favorites) return;

    for (let id of favorites) {
      let favorite = document.querySelectorAll(`[data-favorite="${ id }"]`);

      for (let item of favorite) {
        item.classList.add('active');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  favorite.setActiveElementsFavorite(favorite.getFavorite());

  const buttons = document.querySelectorAll('button')

  buttons.forEach(item => {
    item.addEventListener('click', () => favorite.controlFavorite(item.dataset.favorite))
  })
})