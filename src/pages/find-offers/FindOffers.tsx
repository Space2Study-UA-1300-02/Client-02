import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useTranslation } from 'react-i18next'
import OfferList from '~/components/offer-list/OfferList'
import useAxios from '~/hooks/use-axios'
import { useState, useEffect } from 'react'
import Loader from '~/components/loader/Loader'
import { offerService } from '~/services/offer-service'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/pages/find-offers/FindOffer.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const [hasFetched, setHasFetched] = useState(false);

  const { response: { items }, error, loading, fetchData } =  useAxios({
    service: offerService.getOffers,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: false
  })

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, [hasFetched, fetchData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message || "Failed to fetch offers."}</div>;
  }

  return (
    <PageWrapper>
    <OfferRequestBlock />
    <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title', )}
      />
    <div className="grid gap-4">
       {loading ? (
        <Loader />
      ) : items.length ? (
        <OfferList offers={items} />
      ) : (
        <NotFoundResults description={t('findOffers.notFound.description')} />
      )}
    </div>
    </PageWrapper>
  );
};

export default FindOffers;
