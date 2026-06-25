import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaitlistForm } from '@/components/ui/WaitlistForm'

// mock fetch
global.fetch = vi.fn()

describe('WaitlistForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email input and submit button', () => {
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /加入/i })).toBeInTheDocument()
  })

  it('shows success message on successful submit', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    await userEvent.type(screen.getByRole('textbox'), 'test@example.com')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText('已收到！')).toBeInTheDocument())
  })

  it('shows duplicate message when email already exists', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'duplicate' }),
    })
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    await userEvent.type(screen.getByRole('textbox'), 'existing@example.com')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText('已在名单中。')).toBeInTheDocument())
  })
})
