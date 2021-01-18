$(function(){ 
    
    //インプットするファイル
    let xxFileName = 'xx';

    //ファイル選択イベント
    $('#mtdTree_select_files').change(async(e) => {        
        let files = e.target.files;


        for(let i=0; i<files.length; i++){
            let fileReader = new FileReader();
            //属性を追加できるっぽい
            //https://www.it-swarm-ja.tech/ja/javascript/filereader%E3%81%8C%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%81%AB%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%9F%E5%BE%8C%E3%81%AB%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%90%8D%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B/1069297623/
            //属性に追加したファイル名をonloadイベント時に利用する
            fileReader.fileName = files[i].name;
            await readDataFromFile(fileReader,files[i]);
        }

        alert('読み込み完了');

        //同じファイルを選択するとchangeイベントが発火しないため以下の処理を実行
        //https://qiita.com/_Keitaro_/items/57b1c5dd36b7bed08ad8
        $('#mtdTree_select_files').val('');     
    });
    
    //実行ボタンクリック
    $('#exec').click(async() => {       　   
        

    });

    /**
     *ファイルからデータを読み込み対象のストレージにセットする
     *
     * @param {FileReader} fileReader ファイルリーダー(fileName属性にファイル名をセットすること)
     * @param {File} file 読み込み対象のファイル
     * @returns {boolean} 成功した場合はtrue
     */
    function readDataFromFile(fileReader,file){
        //https://www.tohuandkonsome.site/entry/2018/01/14/221433
        return new Promise((resolve,reject) => {          
                fileReader.onload = (evt) => {
                    setDataToStrage(evt.target.fileName,evt.target.result);
                    resolve(true);
                }           
                fileReader.readAsText(file);
        });
    }

    //ファイル名に一致する最初のファイルを返す
    function findFileByName(files,name){
        for(let i=0; i<files.length; i++){
            if(files[i].name === name){
                return files[i];
            }
        }               
    }

    //ファイルに応じたストレージにデータをセットする
    function setDataToStrage(fileName,data){
        switch(fileName){
            case elemFileName:
                xxStrage.data = JSON.parse(data);
                break;                         
            default:
                break;
        }
    }
})