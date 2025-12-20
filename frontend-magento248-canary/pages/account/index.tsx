import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  AccountDashboardDocument,
  AccountMenu,
  AccountMenuItem,
  AddressSingleLine,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { iconClose, IconSvg, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function AccountIndexPage() {
  const dashboard = useCustomerQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const customer = dashboard.data?.customer
  const address =
    customer?.addresses?.filter((a) => a?.default_shipping)?.[0] || customer?.addresses?.[0]
  const fullName = `${customer?.firstname ?? ''} ${customer?.lastname ?? ''}`.trim()
  const heroImageUrl = 'https://u-mercari-images.mercdn.net/photos/m21223018741_3.jpg'

  return (
    <>
      <PageMeta title={t`Account`} metaRobots={['noindex']} />

      <WaitForCustomer waitFor={dashboard}>
        <Container maxWidth='sm' sx={{ py: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
            >
              <IconButton
                component={NextLink}
                href='/'
                aria-label={t`Close account`}
                size='large'
                sx={{ mt: -1 }}
              >
                <IconSvg src={iconClose} />
              </IconButton>
              <Box sx={{ textAlign: 'center', flex: 1, pt: 1 }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    fontFamily: `'Didot','GFS Didot',serif`,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '0.5rem',
                    lineHeight: '130%',
                    letterSpacing: '0.51em',
                  }}
                >
                  PALAWAN PAWNSHOP
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontFamily: `'Pinyon Script',cursive`,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '2rem',
                    lineHeight: '130%',
                    letterSpacing: 0,
                  }}
                >
                  Jewelry
                </Typography>
              </Box>
              <Box sx={{ width: 48 }} />
            </Box>

            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography
                variant='caption'
                color='text.secondary'
                fontWeight={500}
                sx={{ display: 'block', mb: 0.5 }}
              >
                <Trans>PROFILE</Trans>
              </Typography>
              <Typography variant='h6' fontWeight={700}>
                {(fullName ? fullName.toUpperCase() : undefined) || <Trans>ACCOUNT</Trans>}
              </Typography>
            </Box>

            <Stack spacing={0}>
              <AccountMenuItem
                href='/account/orders'
                title={<Trans>PURCHASES</Trans>}
                noBorderBottom
                sx={{
                  px: 0,
                  mx: 0,
                  '& .MuiButtonBase-root': { pl: 0, pr: 0 },
                  '& .MuiButton-startIcon': { display: 'none' },
                  '& .MuiButton-endIcon .IconSvg': {
                    opacity: 0.5,
                    '& path': {
                      strokeWidth: 3,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    },
                  },
                }}
              />
              <AccountMenuItem
                href='/cart'
                title={<Trans>CART</Trans>}
                noBorderBottom
                sx={{
                  px: 0,
                  mx: 0,
                  '& .MuiButtonBase-root': { pl: 0, pr: 0 },
                  '& .MuiButton-startIcon': { display: 'none' },
                  '& .MuiButton-endIcon .IconSvg': {
                    opacity: 0.5,
                    '& path': {
                      strokeWidth: 3,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    },
                  },
                }}
              />
              <AccountMenuItem
                href='/wishlist'
                title={<Trans>WISHLIST</Trans>}
                noBorderBottom
                sx={{
                  px: 0,
                  mx: 0,
                  '& .MuiButtonBase-root': { pl: 0, pr: 0 },
                  '& .MuiButton-startIcon': { display: 'none' },
                  '& .MuiButton-endIcon .IconSvg': {
                    opacity: 0.5,
                    '& path': {
                      strokeWidth: 3,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    },
                  },
                }}
              />
              <AccountMenuItem
                href='/account/addresses'
                title={<Trans>ADDRESSES</Trans>}
                subtitle={address ? <AddressSingleLine {...address} /> : undefined}
                noBorderBottom
                sx={{
                  px: 0,
                  mx: 0,
                  '& .MuiButtonBase-root': { pl: 0, pr: 0 },
                  '& .MuiButton-startIcon': { display: 'none' },
                  '& .MuiButton-endIcon .IconSvg': {
                    opacity: 0.5,
                    '& path': {
                      strokeWidth: 3,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    },
                  },
                }}
              />
            </Stack>

            <Box
              sx={(theme) => ({
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
              })}
            >
              <Box
                component='img'
                src={heroImageUrl}
                alt={t`Gold necklace`}
                sx={{
                  width: '100%',
                  height: { xs: 220, sm: 260 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box sx={{ backgroundColor: '#0F3A2E', color: '#fff', p: { xs: 2.5, sm: 3 } }}>
                <Stack spacing={1.25}>
                  <Typography variant='subtitle1' fontWeight={700}>
                    <Trans>HELP CENTER</Trans>
                  </Typography>
                  <Typography variant='body2'>
                    <Trans>Is there a problem with your order?</Trans>
                  </Typography>
                  <Typography variant='body2'>
                    <Trans>You may reach out to Palawan Pawnshop Jewelry</Trans>
                  </Typography>
                  <Stack spacing={2.25} sx={{ mt: 0.5 }}>
                    {/* Facebook */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          border: '2px solid #E1A545',
                          color: '#E1A545',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                        aria-hidden
                      >
                        f
                      </Box>
                      <Box>
                        <Link
                          href='https://www.facebook.com/palawanpawnshopjewelry/'
                          target='_blank'
                          rel='noopener noreferrer'
                          sx={{
                            color: '#E1A545',
                            textDecoration: 'underline',
                            textDecorationThickness: '2px',
                            textUnderlineOffset: '4px',
                            fontWeight: 600,
                            display: 'inline-block',
                          }}
                        >
                          https://www.facebook.com/
                        </Link>
                        <Link
                          href='https://www.facebook.com/palawanpawnshopjewelry/'
                          target='_blank'
                          rel='noopener noreferrer'
                          sx={{
                            color: '#E1A545',
                            textDecoration: 'underline',
                            textDecorationThickness: '2px',
                            textUnderlineOffset: '4px',
                            fontWeight: 600,
                            display: 'block',
                            mt: 0.25,
                          }}
                        >
                          palawanpawnshopjewelry
                        </Link>
                      </Box>
                    </Box>

                    {/* Email */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box component='svg' width={36} height={36} viewBox='0 0 24 24' aria-hidden>
                        <rect
                          x='2'
                          y='5'
                          width='20'
                          height='14'
                          rx='2'
                          ry='2'
                          stroke='#E1A545'
                          fill='none'
                          strokeWidth='2'
                        />
                        <polyline
                          points='3,7 12,13 21,7'
                          stroke='#E1A545'
                          fill='none'
                          strokeWidth='2'
                        />
                      </Box>
                      <Box>
                        <Link
                          href='mailto:palawanpawnshopjewelry@palawanpawnshop.com'
                          sx={{
                            color: '#E1A545',
                            textDecoration: 'underline',
                            textDecorationThickness: '2px',
                            textUnderlineOffset: '4px',
                            fontWeight: 600,
                            display: 'block',
                          }}
                        >
                          palawanpawnshopjewelry
                        </Link>
                        <Link
                          href='mailto:palawanpawnshopjewelry@palawanpawnshop.com'
                          sx={{
                            color: '#E1A545',
                            textDecoration: 'underline',
                            textDecorationThickness: '2px',
                            textUnderlineOffset: '4px',
                            fontWeight: 600,
                            display: 'block',
                            mt: 0.25,
                          }}
                        >
                          @palawanpawnshop.com
                        </Link>
                      </Box>
                    </Box>

                    {/* Phone */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box component='svg' width={36} height={36} viewBox='0 0 24 24' aria-hidden>
                        <path
                          d='M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.2 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.58-1.58a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z'
                          fill='none'
                          stroke='#E1A545'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </Box>
                      <Link
                        href='tel:+639178198383'
                        sx={{
                          color: '#E1A545',
                          textDecoration: 'underline',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '4px',
                          fontWeight: 600,
                          display: 'inline-block',
                        }}
                      >
                        +63 917 819 9383
                      </Link>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}

AccountIndexPage.pageOptions = pageOptions

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const staticClient = graphqlSsrClient(context)
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: t`Home` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
