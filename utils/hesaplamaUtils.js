export const hesaplaTohum = (alan, birimMiktar, birimFiyat) => {
    const toplamMiktar = alan * birimMiktar;
    const toplamMaliyet = toplamMiktar * birimFiyat;

    return {
        toplamMiktar,
        toplamMaliyet,
        birim: 'kg'
    };
};
