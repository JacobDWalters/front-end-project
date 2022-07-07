const $body = $(document.body);
const $container = $(".game");
const $input = $("input[name='guess']");
const $guess = $("#guess");
const $conf = $('#conf');
const $ppg = $('#ppg');
const $rpg = $('#rpg');
const $apg = $('#apg');
const $ft = $('#ft');
const $position = $('#position');
const $division = $('#division');
const $team = $('#team'); 

const playersArr = ['rj_barret', 'tj_warren', 'marcus_morris', 'derrick_rose', 'jae_crowder', 'kevin_huerter', 'Evan_Fournier', 'Jusuf_Nurkic', 'Jonas_Valanciunas', 'Larry_Nance Jr',
'Tim_Hardaway Jr', 'Harrison_Barnes', 'Danny_Green', 'Richaun_Holmes', 'Jonathan_Isaac', 'Caris_LeVert', "D'Angelo_Russell", 'Andrew_Wiggins', 'Norman_Powell', 'Dejounte_Murray',
'Joe_Ingles', 'Terry_Rozier', 'Robert_Covington', 'Brook_Lopez', 'Collin_Sexton', 'Duncan_Robinson', 'Cade_Cunningham', 'Joe_Harris', 'Bojan_Bogdanovic', 'Kristaps_Porzingis',
'Seth_Curry', 'Aaron_Gordon', 'Spencer_Dinwiddie', 'Dillon_Brooks', 'Lonzo_Ball', 'Clint_Capela', 'Jaren_Jackson Jr', 'Tyrese_Haliburton', 'Anthony_Edwards', 'Bogdan_Bogdanovic',
'Kemba_Walker', 'Mikal_Bridges', 'Myles_Turner', 'Tobias_Harris', 'Jerami_Grant', 'Malcolm_Brogdon', 'Christian_Wood', 'OG_Anunoby', 'LaMelo_Ball', 'Deandre_Ayton',
'John_Collins', 'Marcus_Smart', 'DeMar_DeRozan', 'Nikola_Vucevic', 'Michael_Porter Jr', 'Mike _onley', 'Julius_Randle', 'Gordon_Hayward', 'Fred_VanVleet', 'Pascal_Siakam',
'Brandon_Ingram', 'CJ_McCollum', 'Russell_Westbrook', 'Jamal_Murray', 'Domantas_Sabonis', 'Klay_Thompson', 'Kyle_Lowry', "De'Aaron_Fox", 'Ja_Morant', 'Shai_Gilgeous-Alexander',
'Ben_Simmons', 'Draymond_Green', 'Zach_LaVine', 'Jrue_Holiday', 'Bam_Adebayo', 'Jaylen_Brown', 'Rudy_Gobert', 'Khris _Middleton', 'Karl-Anthony_Towns', 'Devin_Booker',
'Donovan_Mitchell', 'Chris_Paul', 'Trae_Young', 'Kyrie_Irving', 'Bradley_Beal', 'Jimmy_Butler', 'Zion_Williamson', 'Paul_George', 'Jayson_Tatum', 'Damian_Lillard',
'Anthony_Davis', 'Kawhi_Leonard', 'Joel_Embiid', 'James_Harden', 'Nikola_Jokic', 'Luka_Doncic', 'Stephen_Curry', 'Giannis_Antetokounmpo', 'LeBron_James', 'Kevin_Durant'];


let answer = null

$('.start').click(() => {
    //get the data of a random player
    let randomPlayer = playersArr[Math.round(Math.random() * 100)]
    let randomID = ''
    $.get(`https://www.balldontlie.io/api/v1/players?search=${randomPlayer}`, (data) => {
        console.log(data);
        //create shortcut for assignments
        let result = data.data[0];
        answer = result.first_name + ' ' + result.last_name;
        randomID = result.id
        console.log(answer);

        //assign the needed values to the divs
        $conf.text(result.team.conference);
        $position.text(result.$position);
        $division.text(result.team.division);
        $team.text(result.team.full_name);

        $.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${randomID}`, (data) => {
            console.log(data);
            //create shortcut for assignments
            let result2 = data.data[0];
            //assign the needed values
            if (data.data == []) {
                $ppg.text('Did Not Play in 2021');
                $rpg.text('Did Not Play in 2021');
                $apg.text('Did Not Play in 2021');
                $ft.text('Did Not Play in 2021');
            } else {
                $ppg.text(result2.pts);
                $rpg.text(result2.reb);
                $apg.text(result2.ast);
                $ft.text((result2.ft_pct * 10) + '%'); 
            }
            
            $('.one-time').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true
              });

    });
    });
    
    
return
});

$guess.submit((event) => {
    event.preventDefault();
    if (answer.toUpperCase() == $input.val().toUpperCase()) {
        console.log('congrats');
    } else {
        console.log('you are wrong');
    }
});

