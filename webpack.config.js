const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        // 기본 기능
        base: './script/base.js',
        login: './script/login.js',
        // 마이페이지
        mypage: './script/mypage.js',
        myword: './script/myWord.js',
        ranking: './script/Ranking.js',
        myreading: './script/SavedReading.js',
        // 리다이렉트
        redirectka: './script/redirect.js',
        redirectgit: './script/redirect_git.js',
        // 백오피스
        backoffice: './script/BackOffice.js',
        createmail: './script/createMail.js',
        createnotice: './script/CreateNotice.js',
        // 결제
        buyingpage: './script/BuyingPage.js',
        checkpage: './script/checkPage.js',
        // faq
        createAns: './script/CreateAns.js',
        createFAQ: './script/CreateFAQ.js',
        detailFAQ: './script/DetailFAQ.js',
        modifyAns: './script/ModifyAns.js',
        modifyFAQ: './script/ModifyFAQ.js',
        FAQlist: './script/FAQList.js',
        // 서비스
        dialogue: './script/dialogue.js',
        existedreading: './script/ExistedReading.js',
        newspage: './script/NewsPage.js',
        readingprb: './script/ReadingPrb.js',
        vocab: './script/Vocab.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        // 기본 기능
        new HtmlWebpackPlugin({
            template: './templates/base.html',
            filename: 'base.html',
            chunks: ['base'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/login.html',
            filename: 'login.html',
            chunks: ['login'],
        }),

        // 마이페이지
        new HtmlWebpackPlugin({
            template: './templates/MyPage.html',
            filename: 'MyPage.html',
            chunks: ['mypage'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/myWord.html',
            filename: 'MyWord.html',
            chunks: ['myword'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/Ranking.html',
            filename: 'Ranking.html',
            chunks: ['ranking'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/SavedReading.html',
            filename: 'SavedReading.html',
            chunks: ['myreading'],
        }),
        // 백오피스
        new HtmlWebpackPlugin({
            template: './templates/BackOffice.html',
            filename: 'BackOffice.html',
            chunks: ['backoffice'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/createMail.html',
            filename: 'CreateMail.html',
            chunks: ['createmail'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/CreateNotice.html',
            filename: 'CreateNotice.html',
            chunks: ['createnotice'],
        }),
        // 리다이렉트
        new HtmlWebpackPlugin({
            template: './templates/redirect.html',
            filename: 'Redirect.html',
            chunks: ['redirectka'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/redirectGit.html',
            filename: 'RedirectGit.html',
            chunks: ['redirectgit'],
        }),
        // 결제
        new HtmlWebpackPlugin({
            template: './templates/BuyingPage.html',
            filename: 'BuyingPage.html',
            chunks: ['buyingpage'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/checkPage.html',
            filename: 'CheckPage.html',
            chunks: ['checkpage'],
        }),
        // FAQ
        new HtmlWebpackPlugin({
            template: './templates/CreateAns.html',
            filename: 'CreateAns.html',
            chunks: ['createAns'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/CreateFAQ.html',
            filename: 'CreateFAQ.html',
            chunks: ['createFAQ'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/DetailFAQ.html',
            filename: 'DetailFAQ.html',
            chunks: ['detailFAQ'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/ModifyAns.html',
            filename: 'ModifyAns.html',
            chunks: ['modifyAns'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/ModifyFAQ.html',
            filename: 'ModifyFAQ.html',
            chunks: ['modifyFAQ'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/FAQList.html',
            filename: 'FAQList.html',
            chunks: ['FAQlist'],
        }),
        // 서비스
        new HtmlWebpackPlugin({
            template: './templates/dialogue.html',
            filename: 'Dialogue.html',
            chunks: ['dialogue'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/NewsPage.html',
            filename: 'NewsPage.html',
            chunks: ['newspage'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/ExistedReading.html',
            filename: 'ExistedReading.html',
            chunks: ['existedreading'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/ReadingPrb.html',
            filename: 'ReadingPrb.html',
            chunks: ['readingprb'],
        }),
        new HtmlWebpackPlugin({
            template: './templates/Vocab.html',
            filename: 'Vocab.html',
            chunks: ['vocab'],
        }),
        // email 인증 
        new HtmlWebpackPlugin({
            template: './templates/email_await.html',
            filename: 'EmailAwait.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
    ],
};
