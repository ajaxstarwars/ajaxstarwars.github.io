(function() {

    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var heroProperty = ['Name', 'Height', 'Mass', 'Hair color', 'Skin Color', 'Eye Color', 'Birth Year', 'Gender'];
    var second = document.getElementById('second');
    var third = document.getElementById('third');
    var index = 1;
    var disablePrev = true;
    var disableNext = false;

    defineHerosId('http://swapi.co/api/people/' + index);

    function defineHerosId(url) {

      fetch(url).then(function(response){
        if(response.status === 200) {
          response.json()
        .then(function(hero){
          second.innerHTML = "Name: " + hero.name + "</br>" + "Height: " + hero.height + "</br>" + "Mass: " + hero.mass + "</br>" + "Hair color: " + hero.hair_color + "</br>" +
                           "Skin color: " + hero.skin_color + "</br>" + "Eye color: " + hero.eye_color + "</br>" + "Birth year: " + hero.birth_year + "</br>" + "Gender: " + hero.gender;


          for(var i=0; i < third.children.length; i++) {
            getFilms(hero.films[i], third.children[i]);
          }

          function getFilms(url, node) {
                if(url) {
                  fetch(url).then(function(response){
                    if(response.status === 200) {
                      response.json()
                    .then(function(film){
                      node.innerHTML = 'Episode ' + film['episode_id'] + ': ' + film['title'];
                    });
                    }
                  }).catch(function (e) { alert( 'Error. Please refresh your browser'); });
                  }
              };
        });
        }
        }).catch(function (e) { alert( 'Error. Please refresh your browser'); });
    };

    

    prev.addEventListener('click', prevHero, false);
    next.addEventListener('click', nextHero, false);

    prev.classList.remove('prime');
    prev.classList.add('disabled');

    function prevHero() {
        index--;
        if(index < 1) {
 
            prev.classList.remove('prime');
            prev.classList.add('disabled');
            disablePrev = true;
        }
        if(disableNext) {
            next.classList.add('prime');
            next.classList.remove('disabled');
        }
        defineHerosId('http://swapi.co/api/people/' + index);
    };

    function nextHero() {
      index++;
      if(index > 88) {
        next.classList.remove('prime');
        next.classList.add('disabled');
        disableNext = true;
      }

      if(disablePrev) {
        prev.classList.add('prime');
        prev.classList.remove('disabled');
      }

    defineHerosId('http://swapi.co/api/people/' + index);

    };

})();