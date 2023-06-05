const fetchPokemonDetail = async (url) => {
  try {
    const response = await axios.get(url);
    const pokemonData = response.data;

    const htmlContent = `
        <div class="content-details">
          <a class="content-back" href="./index.html">&#8249;</a>
          <h1 class="content-details-heading">${pokemonData.name}</h1>
          <img class="content-details-img" src="${
            pokemonData.sprites.front_default
          }" alt="${pokemonData.name}"/>
    
          <table>
            <tr>
                <th>Weight</th>
                <th>Height</th>
                <th>Types</th>
            </tr>
            <tr>
                <td>${pokemonData.weight}</td>
                <td>${pokemonData.height}</td>
                <td>${pokemonData.types
                  .map((types) => types.type.name)
                  .join(', ')}</td>
            </tr>
          </table>
        <div>
        `;

    const detailElement = document.createElement('div');
    detailElement.innerHTML = htmlContent;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    resultElement.appendChild(detailElement);
  } catch (error) {
    console.log(`Terjadi Error Pada ${error}`);
  }
};

const fetchData = async () => {
  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;

  try {
    const searchValue = document
      .getElementById('search-input')
      .value.toLowerCase();
    const resultElement = document.getElementById('result');
    const loadingElement = document.getElementById('loading');
    const notFoundElement = document.getElementById('not-found');
    const paginationElement = document.getElementById('pagination');

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const dataResult = response.data.results;

    loadingElement.style.display = 'block';
    notFoundElement.style.display = 'none';

    const filteredData = dataResult.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );

    if (filteredData.length === 0) {
      notFoundElement.style.display = 'block';
      resultElement.innerHTML = ''; // Mengosongkan hasil pencarian sebelumnya
      paginationElement.innerHTML = ''; // Menghapus tombol paginasi
    } else {
      const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
      let htmlContent = '<ul>';

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      paginatedData.forEach((pokemon) => {
        htmlContent += `
          <li>
            <a href="#" onclick="fetchPokemonDetail('${pokemon.url}')">
              <span>
                <img src="./src/assets/img/icon.png" width="15px" /> ${pokemon.name}
              </span> 
              <span>&#8250;</span>
            </a>
          </li>`;
      });

      htmlContent += '</ul>';

      resultElement.innerHTML = htmlContent;

      let paginationHtml = '';
      for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
          <button onclick="changePage(${i})" ${
          currentPage === i ? 'class="active"' : ''
        }>${i}</button>
        `;
      }

      paginationElement.innerHTML = paginationHtml;
    }

    loadingElement.style.display = 'none';
  } catch (error) {
    console.log(`Terjadi Error Pada: ${error}`);
  }
};

const changePage = (pageNumber) => {
  currentPage = pageNumber;
  fetchData();
};

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', fetchData);
  fetchData();
});
