async function fetchPokemonDetail(url) {
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
}

async function searchData() {
  try {
    const searchValue = document
      .getElementById('search-input')
      .value.toLowerCase();
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const dataResult = response.data.results;
    const resultElement = document.getElementById('result');

    let htmlContent = '<ul>';

    dataResult.map((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchValue)) {
        htmlContent += `
        <li>
          <a href="#" onclick="fetchPokemonDetail('${pokemon.url}')"><span><img src="./src/assets/img/icon.png" width="15px" /> ${pokemon.name}</span> <span>&#8250;</span></a>
        </li>`;
      }
    });

    htmlContent += '</ul>';

    resultElement.innerHTML = htmlContent;
  } catch (error) {
    console.log(`Terjadi Error Pada: ${error}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', searchData);
  searchData();
});
