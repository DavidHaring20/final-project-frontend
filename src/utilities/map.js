export const parseDeviceHealthToMarkerColor = (pinged) => {
    if(!pinged || pinged == undefined) return 'secondary';

    return (new Date() - new Date(pinged) >= 10 * 60 * 1000) ? 'danger'
        : 'success'
        /* : (health > 25 && health <= 80) ? 'warning'
        : (health > 80) ? 'success'
        : 'warning'; */
}
