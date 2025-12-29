import { Box } from '@mui/material'

export function DiscountBadge({ percent }: { percent?: number | null }) {
  if (!percent || percent <= 0) return null
  return (
    <Box
      sx={(theme) => ({
        bgcolor: '#E9AC52',
        color: '#FFF',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        fontWeight: 700,
        borderRadius: 1,
        px: 1.25,
        py: 0.5,
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        boxShadow: 'none',
        mr: '-4px',
        [theme.breakpoints.down('sm')]: {
          px: 1,
          py: 0.4,
          fontSize: 13,
          mr: '-3px',
        },
      })}
    >
      {Math.round(percent)}% OFF
    </Box>
  )
}
