class Zodiac {

    zodiacObj = [
        {name: "Aries", main: "./img/mainZodiacs/aries.png", match: "./img/zodiacImgs/Aries.png"},
        {name: "Taurus", main: "./img/mainZodiacs/taurus.png", match: "./img/zodiacImgs/Taurus.png"},
        {name: "Gemini", main: "./img/mainZodiacs/gemini.png", match: "./img/zodiacImgs/Gemini.png"},
        {name: "Cancer", main: "./img/mainZodiacs/cancer.png", match: "./img/zodiacImgs/Cancer.png"},
        {name: "Leo", main: "./img/mainZodiacs/leo.png", match: "./img/zodiacImgs/Leo.png"},
        {name: "Virgo", main: "./img/mainZodiacs/virgo.png", match: "./img/zodiacImgs/Virgo.png"},
        {name: "Libra", main: "./img/mainZodiacs/libra.png", match: "./img/zodiacImgs/Libra.png"},
        {name: "Scorpio", main: "./img/mainZodiacs/scorpio.png", match: "./img/zodiacImgs/Scorpio.png"},
        {name: "Sagittarius", main: "./img/mainZodiacs/sagittarius.png", match: "./img/zodiacImgs/Saggitarius.png"},
        {name: "Capricorn", main: "./img/mainZodiacs/capricorn.png", match: "./img/zodiacImgs/Capricorn.png"},
        {name: "Aquarius", main: "./img/mainZodiacs/aquarius.png", match: "./img/zodiacImgs/Aquarius.png"},
        {name: "Pisces", main: "./img/mainZodiacs/pisces.png", match: "./img/zodiacImgs/Pisces.png"}
    ]

    constructor(){
        this.day = "";
        this.month = "";
        this.mainImg = "";
    }

    setDate(day, month){
        this.day = day;
        this.month = month;
    }

    setMainImg(zodiacSign){
        this.mainImg = zodiacSign;
    }

    getZodiacSigns(){
        if(this.month < 13 && this.day < 32){
            if (this.month == 3 && this.day >= 21 || this.month == 4 && this.day <= 19) {
                return this.zodiacObj[0]["name"];
            } else if (this.month == 4 && this.day >= 20 || this.month == 5 && this.day <= 20) {
                return this.zodiacObj[1]["name"];
            } else if (this.month == 5 && this.day >= 21 || this.month == 6 && this.day <= 21) {
                return this.zodiacObj[2]["name"];
            } else if (this.month == 6 && this.day >= 22 || this.month == 7 && this.day <= 22) {
                return this.zodiacObj[3]["name"];
            } else if (this.month == 7 && this.day >= 23 || this.month == 8 && this.day <= 22) {
                return this.zodiacObj[4]["name"];
            } else if (this.month == 8 && this.day >= 23 || this.month == 9 && this.day <= 22) {
                return this.zodiacObj[5]["name"];
            } else if (this.month == 9 && this.day >= 23 || this.month == 10 && this.day <= 23) {
                return this.zodiacObj[6]["name"];
            } else if (this.month == 10 && this.day >= 24 || this.month == 11 && this.day <= 22) {
                return this.zodiacObj[7]["name"];
            } else if (this.month == 11 && this.day >= 23 || this.month == 12 && this.day <= 21) {
                return this.zodiacObj[8]["name"];
            } else if (this.month == 12 && this.day >= 22 || this.month == 1 && this.day <= 19) {
                return this.zodiacObj[9]["name"];
            } else if (this.month == 1 && this.day >= 20 || this.month == 2 && this.day <= 18) {
                return this.zodiacObj[10]["name"];
            } else {
                return this.zodiacObj[11]["name"];
            }
        } else {
            alert("Invalid Date of Birth, Please try again.");
        }
    }

    getMainImg(){
        for (const zodiacIndex of this.zodiacObj) {
            if(zodiacIndex["name"] === this.mainImg){
                return zodiacIndex["main"];
            }
        }
    }

    getMatchImg(zodiacSign){
        for (const zodiacIndex of this.zodiacObj) {
            if(zodiacIndex["name"] === zodiacSign){
                return zodiacIndex["match"];
            }
        }
    }
}