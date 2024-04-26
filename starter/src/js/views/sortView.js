class SortView extends View {
  _parentElement = document.querySelector('.sort-options');

  addHandlerSorting() {
    this._parentElement.addEventListener('change', function () {
      if (this.option === 'duration') {
      }
      if (this.option === 'ingredients') {
      }
    });
  }
}

export default new SortView();
